import Fastify from 'fastify';
import { z } from 'zod';
import { DefaultAtomizer } from '@egos/atomizer/default-atomizer';
import { InMemorySearchEngine } from '@egos/search-engine/in-memory-search';

const app = Fastify({ logger: true });
const atomizer = new DefaultAtomizer();
const searchEngine = new InMemorySearchEngine();

const ingestSchema = z.object({
  sourceId: z.string().min(1),
  sourceType: z.string().min(1),
  content: z.string().min(1),
  authorId: z.string().optional(),
  metadata: z.record(z.unknown()).optional(),
});

app.get('/health', async () => ({ ok: true, service: 'egos-api' }));

app.post('/ingest', async (request, reply) => {
  const parsed = ingestSchema.safeParse(request.body);

  if (!parsed.success) {
    return reply.status(400).send({
      error: 'invalid_payload',
      issues: parsed.error.flatten(),
    });
  }

  const atoms = await atomizer.atomize(parsed.data);
  await searchEngine.index(atoms);

  return {
    indexed: atoms.length,
    atoms,
  };
});

app.get('/search', async (request) => {
  const querySchema = z.object({
    q: z.string().optional(),
    limit: z.coerce.number().int().positive().max(50).optional(),
  });

  const parsed = querySchema.parse(request.query);
  if (!parsed.q) return { results: [] };

  const results = await searchEngine.search({
    text: parsed.q,
    limit: parsed.limit,
  });

  return { results };
});

app.get('/suggest', async (request) => {
  const querySchema = z.object({
    q: z.string().optional(),
  });

  const parsed = querySchema.parse(request.query);
  return {
    suggestions: await searchEngine.suggest(parsed.q ?? ''),
  };
});

async function start(): Promise<void> {
  try {
    await app.listen({ port: 3000, host: '0.0.0.0' });
  } catch (error) {
    app.log.error(error);
    process.exit(1);
  }
}

void start();
