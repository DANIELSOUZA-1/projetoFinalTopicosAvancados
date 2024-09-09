const { readCSV } = require('./utils');
const { scheduleClasses, displaySchedule } = require('./scheduler');

async function main() {
  // Ler as turmas e disciplinas dos arquivos CSV
  const turmas = await readCSV('../data/lista_turmas.csv');
  const disciplinasTads = await readCSV('../data/grade_curricular_tads_com_professores.csv');
  const disciplinasAdm = await readCSV('../data/grade_curricular_administracao_com_professores.csv');
  
  // Combinar as disciplinas de ambos os cursos
  const disciplinas = [...disciplinasTads, ...disciplinasAdm];

  // Criar 10 salas de aula disponíveis
  const salas = Array.from({ length: 10 }, (_, i) => ({ sala: i + 1 }));

  // Gerar a grade de horários
  const horarios = scheduleClasses(turmas, disciplinas, salas);

  // Exibir a grade de horários
  displaySchedule(horarios);
}

main();
