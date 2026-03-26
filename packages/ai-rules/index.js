const path = require('path');
const fs = require('fs');

/**
 * Retorna o caminho absoluto para o arquivo .windsurfrules padrão.
 */
function getRulesPath() {
  return path.join(__dirname, '.windsurfrules');
}

/**
 * Lê e retorna o conteúdo do arquivo .windsurfrules.
 */
function getRulesContent() {
  return fs.readFileSync(getRulesPath(), 'utf8');
}

module.exports = {
  getRulesPath,
  getRulesContent
};
