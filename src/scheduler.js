const TURNO_MANHA = ['08:00', '09:00', '10:00', '11:00'];
const TURNO_TARDE = ['14:00', '15:00', '16:00', '17:00'];
const TURNO_NOITE = ['18:00', '19:00', '20:00', '21:00'];

const MAX_HORAS_DIARIAS = 8;

const scheduleClasses = (turmas, disciplinas, salas) => {
  const horarios = {};

  turmas.forEach(turma => {
    const grade = [];
    const turmaDisciplinas = disciplinas.filter(d => d.Período === turma.Período);

    turmaDisciplinas.forEach(disciplina => {
      const professor = disciplina.Professor;
      let horasAlocadas = 0;

      // Tentar alocar em todos os turnos disponíveis
      [TURNO_MANHA, TURNO_TARDE, TURNO_NOITE].forEach(turno => {
        turno.forEach(horario => {
          if (horasAlocadas < disciplina.Créditos) {
            if (!checkConflict(professor, horario, grade) && !checkSalaConflict(salas, horario, grade)) {
              grade.push({
                horario,
                disciplina: Object.values(disciplina)[1],
                professor: professor,
                sala: Object.values(findAvailableRoom(salas, horario, grade))[0]
              });
              horasAlocadas++;
            }
          }
        });
      });
    });

    horarios[turma.Curso] = grade;
  });

  return horarios;
};

// Função para verificar conflito de professores
const checkConflict = (professor, horario, grade) => {
  return grade.some(entrada => entrada.professor === professor && entrada.horario === horario);
};

// Função para verificar conflito de salas
const checkSalaConflict = (salas, horario, grade) => {
  return grade.some(entrada => entrada.horario === horario && salas.includes(entrada.sala));
};

// Função para encontrar uma sala disponível
const findAvailableRoom = (salas, horario, grade) => {
  const salasOcupadas = grade.filter(entrada => entrada.horario === horario).map(entrada => entrada.sala);
  return salas.find(sala => !salasOcupadas.includes(sala.sala));
};

// Função para exibir a grade de horários de cada turma
const displaySchedule = (horarios) => {
  Object.keys(horarios).forEach(turma => {
    console.log(`\nHorários para a turma ${turma}:`);
    horarios[turma].forEach(horario => {
      console.log(`${horario.horario} - ${horario.disciplina} com ${horario.professor} na sala ${horario.sala}`);
    });
  });
};

module.exports = { scheduleClasses, displaySchedule };
