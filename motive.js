const {Renderer,Stave,StaveNote,Beam,Formatter,Accidental,Dot,StaveTie,Flow,} = Vex;

const div = document.getElementById("motive");
const renderer = new Renderer(div, Renderer.Backends.SVG);

renderer.resize(1000, 1000);
const context = renderer.getContext();

const pracBtn = document.getElementById("pracBtn");
const challengeBtn = document.getElementById('challengeBtn')
const db = [
  {
    clef: "treble",
    time: "4/4",
    duration: ["8d","16","8d","16","q","8","8","8d","16","8d","16","q","8","8",],
    keys: ["a/4","a/4","a/4","f/4","f/4","a/4","b/4","a/4","a/4","a/4","f/4","f/4","g/4","f/4",],
    keysignature: "F",
  },
  {
    clef: "treble",
    time: "4/4",
    duration: ["qr", "8", "8", "8", "16", "16", "16", "8d", "h", "hr"],
    keys: ["b/4","a/4","g/4","f/4","e/4","d/4","d/4","e/4","f/4","c/5",],
    keysignature: "C",
  },
  {
    clef: "treble",
    time: "4/4",
    duration: ["8", "8", "8", "8", "4", "4r", "8r", "8", "8", "8", "4", "4r"],
    keys: ["f/4","f/4","f/4","f/4","f/4","b/4","b/4","e/4","e/4","e/4","e/4","b/4",],
    keysignature: "Bb",
  },
  {
    clef: "treble",
    time: "4/4",
    duration: ["8", "8", "8", "8", "4", "4r", "8r", "8", "8", "8", "4", "4r"],
    keys: ["f/4","f/4","f/4","f/4","f/4","b/4","b/4","e/4","e/4","e/4","e/4","b/4",],
    keysignature: "Eb",
  },
  {
    clef: "treble",
    time: "4/4",
    duration: ["8", "8", "8", "8", "4", "4r", "8r", "8", "8", "8", "4", "4r"],
    keys: ["f/4","f/4","f/4","f/4","f/4","b/4","b/4","e/4","e/4","e/4","e/4","b/4",],
    keysignature: "Ab",
  },
  {
    clef: "treble",
    time: "4/4",
    duration: ["8", "8", "8", "8", "4", "4r", "8r", "8", "8", "8", "4", "4r"],
    keys: ["f/4","f/4","f/4","f/4","f/4","b/4","b/4","e/4","e/4","e/4","e/4","b/4",],
    keysignature: "Db",
  },
  {
    clef: "treble",
    time: "4/4",
    duration: ["8", "8", "8", "8", "4", "4r", "8r", "8", "8", "8", "4", "4r"],
    keys: ["f/4","f/4","f/4","f/4","f/4","b/4","b/4","e/4","e/4","e/4","e/4","b/4",],
    keysignature: "F#",
  },
];

const randomNum = Math.floor(Math.random() * db.length); // randomNum => 개별 동기의 고유한 ID라고 생각하세요.
const dt = new Date
const todaysNum = dt.getDay()
const todaysData = db[todaysNum];

//2개의 마디 생성하는 코드
const staveMeasure1 = new Stave(200, 50, 350);
staveMeasure1
  .addClef(todaysData.clef)
  .addTimeSignature(todaysData.time)
  .addKeySignature(todaysData.keysignature)
  .setContext(context)
  .draw();

const staveMeasure2 = new Stave(staveMeasure1.width + staveMeasure1.x, 50, 350);
staveMeasure2.setContext(context).draw();
//여기까지 __//

//반복적으로 등장하여 템플릿화 시킨 코드들 (note입력, tie입력, formatter함수, beam함수, dotted 등)
const noteTemplate = (a) => {
  return new StaveNote({
    keys: [todaysData.keys[a]],
    duration: todaysData.duration[a],
  });
};

const tieTemplate = (noteMeasureNum, first, last) => {
  return new StaveTie({
    first_note: noteMeasureNum[first],
    last_note: noteMeasureNum[last],
    first_indices: [0],
    last_indices: [0],
  });
};

const formatter = function (noteMeasure1, noteMeasure2) {
  Formatter.FormatAndDraw(context, staveMeasure1, noteMeasure1);
  Formatter.FormatAndDraw(context, staveMeasure2, noteMeasure2);
};

const boilerPlate = (noteMeasure1, noteMeasure2, ties) => {
  const beams1 = Beam.generateBeams(noteMeasure1);
  const beams2 = Beam.generateBeams(noteMeasure2);

  formatter(noteMeasure1, noteMeasure2);

  beams1.forEach(function (b) {
    b.setContext(context).draw();
  });
  beams2.forEach(function (b) {
    b.setContext(context).draw();
  });
  ties.forEach((t) => {
    t.setContext(context).draw();
  });
};
function dotted(staveNote, noteIndex = -1) {
  if (noteIndex < 0) {
    Dot.buildAndAttach([staveNote], {
      all: true,
    });
  } else {
    Dot.buildAndAttach([staveNote], {
      index: noteIndex,
    });
  }
  return staveNote;
}
//여기까지 __//

//아래로는 todaysNum로 정의되는 각 Motive의 id에 따라 작동하는 조건문
//요일별로 다른 악보가 등장한다.
if (todaysNum === 0) {
  const noteMeasure1 = [
    dotted(noteTemplate(0)),
    noteTemplate(1),
    dotted(noteTemplate(2)),
    noteTemplate(3),
    noteTemplate(4),
    noteTemplate(5),
    noteTemplate(6),
  ];
  const noteMeasure2 = [
    dotted(noteTemplate(7)),
    noteTemplate(8),
    dotted(noteTemplate(9)),
    noteTemplate(10),
    noteTemplate(11),
    noteTemplate(12),
    noteTemplate(13),
  ];
  const ties = [
    tieTemplate(noteMeasure1, 1, 2),
    tieTemplate(noteMeasure1, 3, 4),
    tieTemplate(noteMeasure2, 1, 2),
    tieTemplate(noteMeasure2, 3, 4),
  ];
  boilerPlate(noteMeasure1, noteMeasure2, ties);
} else if (todaysNum === 1) {
  const noteMeasure1 = [
    noteTemplate(0),
    noteTemplate(1),
    noteTemplate(2),
    noteTemplate(3),
    noteTemplate(4),
    noteTemplate(5),
    noteTemplate(6),
    dotted(noteTemplate(7)),
  ];
  const noteMeasure2 = [noteTemplate(8), noteTemplate(9)];
  const ties = [tieTemplate(noteMeasure1, 5, 6)];
  boilerPlate(noteMeasure1, noteMeasure2, ties);
} else if (todaysNum === 2) {
  const noteMeasure1 = [
    noteTemplate(0),
    noteTemplate(1),
    noteTemplate(2),
    noteTemplate(3),
    noteTemplate(4),
    noteTemplate(5),
  ];
  const noteMeasure2 = [
    noteTemplate(6),
    noteTemplate(7),
    noteTemplate(8),
    noteTemplate(9),
    noteTemplate(10),
    noteTemplate(11),
  ];
  const ties = [];
  boilerPlate(noteMeasure1, noteMeasure2, ties);
}else if(todaysNum === 3){
  const noteMeasure1 = [
    noteTemplate(0),
    noteTemplate(1),
    noteTemplate(2),
    noteTemplate(3),
    noteTemplate(4),
    noteTemplate(5),
  ];
  const noteMeasure2 = [
    noteTemplate(6),
    noteTemplate(7),
    noteTemplate(8),
    noteTemplate(9),
    noteTemplate(10),
    noteTemplate(11),
  ];
  const ties = [];
  boilerPlate(noteMeasure1, noteMeasure2, ties);  
}else if(todaysNum === 4){
const noteMeasure1 = [
  noteTemplate(0),
  noteTemplate(1),
  noteTemplate(2),
  noteTemplate(3),
  noteTemplate(4),
  noteTemplate(5),
];
const noteMeasure2 = [
  noteTemplate(6),
  noteTemplate(7),
  noteTemplate(8),
  noteTemplate(9),
  noteTemplate(10),
  noteTemplate(11),
];
const ties = [];
boilerPlate(noteMeasure1, noteMeasure2, ties);
}else if(todaysNum === 5){
const noteMeasure1 = [
  noteTemplate(0),
  noteTemplate(1),
  noteTemplate(2),
  noteTemplate(3),
  noteTemplate(4),
  noteTemplate(5),
];
const noteMeasure2 = [
  noteTemplate(6),
  noteTemplate(7),
  noteTemplate(8),
  noteTemplate(9),
  noteTemplate(10),
  noteTemplate(11),
];
const ties = [];
boilerPlate(noteMeasure1, noteMeasure2, ties);
}else if(todaysNum === 6){
const noteMeasure1 = [
  noteTemplate(0),
  noteTemplate(1),
  noteTemplate(2),
  noteTemplate(3),
  noteTemplate(4),
  noteTemplate(5),
];
const noteMeasure2 = [
  noteTemplate(6),
  noteTemplate(7),
  noteTemplate(8),
  noteTemplate(9),
  noteTemplate(10),
  noteTemplate(11),
];
const ties = [];
boilerPlate(noteMeasure1, noteMeasure2, ties);
}else {
  console.log("error");
}
//여기까지 __//

//클릭시 새로고침 코드
function ref() {
  window.location.reload();
}

// pracBtn.addEventListener("click", ref);
challengeBtn.addEventListener("click", ref)
//여기까지 //