let tabs;
let mainForm;
let formGeneratorSections;
let formGeneratorSectionDecisionMaking;
let presentationInputsContainerMainTitle;
let presentationInputsContainerSecundaryTitles;
let presentationInputsContainerText;
let presentationInputsContainer;
let addInputButtons;
let addDecisionButtons;
let removeInputButtons;
let removeDecisionButtons;
const classActiveTab = 'tab--active';
const classActiveSection = 'formGeneratorSection--active';

const initializeGeneratorValues = () => {
  const config = {
    generator: {
      currentTab: 1,
    },
    presentation: {
      mainTitle: 'Presentación general del OVA',
      secundaryTitles: [
        'En esta pantalla se presenta una descripción general de lo que es el OVA, cómo está estructurado y qué componentes teóricos se muestran en el mismo. Esta pantalla es una bienvenida y una invitación para que el usuario aborde de manera adecuada el recurso.'
      ],
      text: [
        'Lorem ipsum dolor sit amet, consectetuer adipiscing elit, sed diam nonummy nibh euismod tincidunt ut laoreet dolore magna aliquam erat volutpat. Ut wisi enim ad minim veniam, quis nostrud exerci tation ullamcorper suscipit lobortis nisl ut aliquip ex ea commodo consequat. Duis autem vel eum iriure dolor in hendrerit in vulputate velit esse molestie consequat, vel illum dolore eu feugiat nulla facilisis at vero eros et accumsan et iusto odio dignissim qui blandit praesent luptatum zzril delenit augue duis dolore te feugait nulla facilisi.',
        'Lorem ipsum dolor sit amet, consectetuer adipiscing elit, sed diam nonummy nibh euismod tincidunt ut laoreet dolore magna aliquam erat volutpat. Ut wisi enim ad minim veniam, quis nostrud exerci tation ullamcorper suscipit lobortis nisl ut aliquip ex ea commodo consequat. Duis autem vel eum iriure dolor in hendrerit in vulputate velit esse molestie consequat, vel illum dolore eu feugiat nulla facilisis at vero eros et accumsan et iusto odio dignissim qui blandit praesent luptatum zzril delenit augue duis dolore te feugait nulla facilisi.',
        'Lorem ipsum dolor sit amet, consectetuer adipiscing elit, sed diam nonummy nibh euismod tincidunt ut laoreet dolore magna aliquam erat volutpat. Ut wisi enim ad minim veniam, quis nostrud exerci tation ullamcorper suscipit lobortis nisl ut aliquip ex ea commodo consequat. Duis autem vel eum iriure dolor in hendrerit in vulputate velit esse molestie consequat, vel illum dolore eu feugiat nulla facilisis at vero eros et accumsan et iusto odio dignissim qui blandit praesent luptatum zzril delenit augue duis dolore te feugait nulla facilisi.',
        'Lorem ipsum dolor sit amet, consectetuer adipiscing elit, sed diam nonummy nibh euismod tincidunt ut laoreet dolore magna aliquam erat volutpat. Ut wisi enim ad minim veniam, quis nostrud exerci tation ullamcorper suscipit lobortis nisl ut aliquip ex ea commodo consequat. Duis autem vel eum iriure dolor in hendrerit in vulputate velit esse molestie consequat, vel illum dolore eu feugiat nulla facilisis at vero eros et accumsan et iusto odio dignissim qui blandit praesent luptatum zzril delenit augue duis dolore te feugait nulla facilisi.',
        'Lorem ipsum dolor sit amet, consectetuer adipiscing elit, sed diam nonummy nibh euismod tincidunt ut laoreet dolore magna aliquam erat volutpat. Ut wisi enim ad minim veniam, quis nostrud exerci tation ullamcorper suscipit lobortis nisl ut aliquip ex ea commodo consequat. Duis autem vel eum iriure dolor in hendrerit in vulputate velit esse molestie consequat, vel illum dolore eu feugiat nulla facilisis at vero eros et accumsan et iusto odio dignissim qui blandit praesent luptatum zzril delenit augue duis dolore te feugait nulla facilisi.',
        'Lorem ipsum dolor sit amet, consectetuer adipiscing elit, sed diam nonummy nibh euismod tincidunt ut laoreet dolore magna aliquam erat volutpat. Ut wisi enim ad minim veniam, quis nostrud exerci tation ullamcorper suscipit lobortis nisl ut aliquip ex ea commodo consequat. Duis autem vel eum iriure dolor in hendrerit in vulputate velit esse molestie consequat, vel illum dolore eu feugiat nulla facilisis at vero eros et accumsan et iusto odio dignissim qui blandit praesent luptatum zzril delenit augue duis dolore te feugait nulla facilisi.'
      ],
      extraInfo: {
        title: [
          'Reto'
        ],
        detail: [
          'Se describe el reto que va a desarrollar durante el ejercicio del objeto de toma de decisiones.'
        ]
      },
    },
    instructionsAndObjectives: {
      extraInfo: {
        title: [''],
        detail: [
          'Se describe el reto que va a desarrollar durante el ejercicio del objeto de toma de decisiones.'
        ]
      },
      objectives: {
        title: [
          '***Observación:*** Describir los objetivos según la estructura determinada para estos. Recuerde que un objetivo debe iniciar con un verbo en infinitivo y ser evaluable, para poder determinar si se cumple con el mismo.'
        ],
        detail: [
          'Describir lorem ipsum dolor sit amet, consectetuer adipiscing elit, sed diam nonummy nibh euismod tincidunt.',
          'Identificar lorem ipsum dolor sit amet, consectetuer adipiscing elit, sed diam nonummy nibh euismod.',
          'Interpretar lorem ipsum dolor sit amet, consectetuer adipiscing elit, sed diam nonummy nibh.',
          'Describir lorem ipsum dolor sit amet, consectetuer adipiscing elit, sed diam nonummy nibh euismod tincidunt.',
          'Identificar lorem ipsum dolor sit amet, consectetuer adipiscing elit, sed diam nonummy nibh euismod.',
          'Interpretar lorem ipsum dolor sit amet, consectetuer adipiscing elit, sed diam nonummy nibh.',
          'Describir lorem ipsum dolor sit amet, consectetuer adipiscing elit, sed diam nonummy nibh euismod tincidunt.',
          'Identificar lorem ipsum dolor sit amet, consectetuer adipiscing elit, sed diam nonummy nibh euismod.',
          'Interpretar lorem ipsum dolor sit amet, consectetuer adipiscing elit, sed diam nonummy nibh.',
          'Describir lorem ipsum dolor sit amet, consectetuer adipiscing elit, sed diam nonummy nibh euismod tincidunt.',
          'Identificar lorem ipsum dolor sit amet, consectetuer adipiscing elit, sed diam nonummy nibh euismod.',
          'Interpretar lorem ipsum dolor sit amet, consectetuer adipiscing elit, sed diam nonummy nibh.',
          'Describir lorem ipsum dolor sit amet, consectetuer adipiscing elit, sed diam nonummy nibh euismod tincidunt.',
          'Identificar lorem ipsum dolor sit amet, consectetuer adipiscing elit, sed diam nonummy nibh euismod.',
          'Interpretar lorem ipsum dolor sit amet, consectetuer adipiscing elit, sed diam nonummy nibh.',
          'Describir lorem ipsum dolor sit amet, consectetuer adipiscing elit, sed diam nonummy nibh euismod tincidunt.',
          'Identificar lorem ipsum dolor sit amet, consectetuer adipiscing elit, sed diam nonummy nibh euismod.',
          'Interpretar lorem ipsum dolor sit amet, consectetuer adipiscing elit, sed diam nonummy nibh.',
          'Describir lorem ipsum dolor sit amet, consectetuer adipiscing elit, sed diam nonummy nibh euismod tincidunt.',
          'Identificar lorem ipsum dolor sit amet, consectetuer adipiscing elit, sed diam nonummy nibh euismod.',
          'Interpretar lorem ipsum dolor sit amet, consectetuer adipiscing elit, sed diam nonummy nibh.'
        ]
      },
      thematics: {
        title: [
          'Se describen las temáticas y teoría a abordar en el desarrollo del OVA.'
        ],
        detail: [
          {
            thematic: 'Tema 1',
            descripcion: 'Lorem ipsum dolor sit amet, consectetuer adipiscing elit, sed diam nonummy nibh euismod tincidunt ut laoreet dolore magna aliquam erat volutpat. Ut wisi enim ad minim veniam, quis nostrud exerci tation ullamcorper suscipit lobortis nisl ut aliquip ex ea commodo consequat. Duis autem vel eum iriure dolor in hendrerit in vulputate velit esse molestie consequat, vel illum dolore eu feugiat nulla facilisis at vero eros et accumsan et iusto odio dignissim qui blandit praesent luptatum zzril delenit augue duis dolore te feugait nulla facilisi.'
          },
          {
            thematic: 'Tema 2',
            descripcion: 'Lorem ipsum dolor sit amet, consectetuer adipiscing elit, sed diam nonummy nibh euismod tincidunt ut laoreet dolore magna aliquam erat volutpat. Ut wisi enim ad minim veniam, quis nostrud exerci tation ullamcorper suscipit lobortis nisl ut aliquip ex ea commodo consequat. Duis autem vel eum iriure dolor in hendrerit in vulputate velit esse molestie consequat, vel illum dolore eu feugiat nulla facilisis at vero eros et accumsan et iusto odio dignissim qui blandit praesent luptatum zzril delenit augue duis dolore te feugait nulla facilisi.'
          },
          {
            thematic: 'Tema 3',
            descripcion: 'Lorem ipsum dolor sit amet, consectetuer adipiscing elit, sed diam nonummy nibh euismod tincidunt ut laoreet dolore magna aliquam erat volutpat. Ut wisi enim ad minim veniam, quis nostrud exerci tation ullamcorper suscipit lobortis nisl ut aliquip ex ea commodo consequat. Duis autem vel eum iriure dolor in hendrerit in vulputate velit esse molestie consequat, vel illum dolore eu feugiat nulla facilisis at vero eros et accumsan et iusto odio dignissim qui blandit praesent luptatum zzril delenit augue duis dolore te feugait nulla facilisi.'
          }
        ]
      },
      instructions: {
        title: [
          'El siguiente texto es genérico y no debe ser modificado por el temático'
        ],
        detail: [
          'Al ingresar al simulador podrás ver el contexto en el cual el reto se plantea.',
          'A medida que vas avanzando en la práctica de laboratorio se te presentarán situaciones que requieren tomar una decisión adecuada.',
          'También encontrarás ejercicios de aprendizaje que te permiten reforzar conceptos y te preparan para el momento en que debas tomar la decisión',
          'Cada vez que tomes una decisión correcta ***ganarás una estrella.***',
          'Al ingresar al simulador podrás ver el contexto en el cual el reto se plantea.',
          'A medida que vas avanzando en la práctica de laboratorio se te presentarán situaciones que requieren tomar una decisión adecuada.',
          'También encontrarás ejercicios de aprendizaje que te permiten reforzar conceptos y te preparan para el momento en que debas tomar la decisión',
          'Cada vez que tomes una decisión correcta ***ganarás una estrella.***',
          'Al ingresar al simulador podrás ver el contexto en el cual el reto se plantea.',
          'A medida que vas avanzando en la práctica de laboratorio se te presentarán situaciones que requieren tomar una decisión adecuada.',
          'También encontrarás ejercicios de aprendizaje que te permiten reforzar conceptos y te preparan para el momento en que debas tomar la decisión',
          'Cada vez que tomes una decisión correcta ***ganarás una estrella.***',
          'Al ingresar al simulador podrás ver el contexto en el cual el reto se plantea.',
          'A medida que vas avanzando en la práctica de laboratorio se te presentarán situaciones que requieren tomar una decisión adecuada.',
          'También encontrarás ejercicios de aprendizaje que te permiten reforzar conceptos y te preparan para el momento en que debas tomar la decisión',
          'Cada vez que tomes una decisión correcta ***ganarás una estrella.***',
          'Al ingresar al simulador podrás ver el contexto en el cual el reto se plantea.',
          'A medida que vas avanzando en la práctica de laboratorio se te presentarán situaciones que requieren tomar una decisión adecuada.',
          'También encontrarás ejercicios de aprendizaje que te permiten reforzar conceptos y te preparan para el momento en que debas tomar la decisión',
          'Cada vez que tomes una decisión correcta ***ganarás una estrella.***'
        ]
      },
      glosary: {
        title: [
          'Para que logres una comprensión completa del simulador te recomendamos leer el glosario que se te presenta al inicio del módulo.'
        ],
        detail: [],
        words: [
          {
            word: 'A1',
            detail: "Lorem ipsum dolor sit amet, consectetuer adipiscing elit, sed diam nonummy nibh euismod tincidunt ut laoreet dolore magna aliquam"
          },
          {
            word: 'A2',
            detail: "Lorem ipsum dolor sit amet, consectetuer adipiscing elit, sed diam nonummy nibh euismod tincidunt ut laoreet dolore magna aliquam"
          },
          {
            word: 'A3',
            detail: "Lorem ipsum dolor sit amet, consectetuer adipiscing elit, sed diam nonummy nibh euismod tincidunt ut laoreet dolore magna aliquam"
          },
          {
            word: 'A4',
            detail: "Lorem ipsum dolor sit amet, consectetuer adipiscing elit, sed diam nonummy nibh euismod tincidunt ut laoreet dolore magna aliquam"
          },
          {
            word: 'A5',
            detail: "Lorem ipsum dolor sit amet, consectetuer adipiscing elit, sed diam nonummy nibh euismod tincidunt ut laoreet dolore magna aliquam"
          },
          {
            word: 'A6',
            detail: "Lorem ipsum dolor sit amet, consectetuer adipiscing elit, sed diam nonummy nibh euismod tincidunt ut laoreet dolore magna aliquam"
          },
          {
            word: 'A7',
            detail: "Lorem ipsum dolor sit amet, consectetuer adipiscing elit, sed diam nonummy nibh euismod tincidunt ut laoreet dolore magna aliquam"
          },
          {
            word: 'A8',
            detail: "Lorem ipsum dolor sit amet, consectetuer adipiscing elit, sed diam nonummy nibh euismod tincidunt ut laoreet dolore magna aliquam"
          },
          {
            word: 'A9',
            detail: "Lorem ipsum dolor sit amet, consectetuer adipiscing elit, sed diam nonummy nibh euismod tincidunt ut laoreet dolore magna aliquam"
          },
          {
            word: 'A10',
            detail: "Lorem ipsum dolor sit amet, consectetuer adipiscing elit, sed diam nonummy nibh euismod tincidunt ut laoreet dolore magna aliquam"
          },
          {
            word: 'B1',
            detail: "Lorem ipsum dolor sit amet, consectetuer adipiscing elit, sed diam nonummy nibh euismod tincidunt ut laoreet dolore magna aliquam"
          },
          {
            word: 'B2',
            detail: "Lorem ipsum dolor sit amet, consectetuer adipiscing elit, sed diam nonummy nibh euismod tincidunt ut laoreet dolore magna aliquam"
          },
          {
            word: 'B3',
            detail: "Lorem ipsum dolor sit amet, consectetuer adipiscing elit, sed diam nonummy nibh euismod tincidunt ut laoreet dolore magna aliquam"
          },
          {
            word: 'B4',
            detail: "Lorem ipsum dolor sit amet, consectetuer adipiscing elit, sed diam nonummy nibh euismod tincidunt ut laoreet dolore magna aliquam"
          },
          {
            word: 'D1',
            detail: "Lorem ipsum dolor sit amet, consectetuer adipiscing elit, sed diam nonummy nibh euismod tincidunt ut laoreet dolore magna aliquam"
          },
          {
            word: 'D2',
            detail: "Lorem ipsum dolor sit amet, consectetuer adipiscing elit, sed diam nonummy nibh euismod tincidunt ut laoreet dolore magna aliquam"
          },
          {
            word: 'D3',
            detail: "Lorem ipsum dolor sit amet, consectetuer adipiscing elit, sed diam nonummy nibh euismod tincidunt ut laoreet dolore magna aliquam"
          },
          {
            word: 'Edificio',
            detail: "Lorem ipsum dolor sit amet, consectetuer adipiscing elit, sed diam nonummy nibh euismod tincidunt ut laoreet dolore magna aliquam"
          },
          {
            word: 'Educar',
            detail: "Lorem ipsum dolor sit amet, consectetuer adipiscing elit, sed diam nonummy nibh euismod tincidunt ut laoreet dolore magna aliquam"
          }
        ]
      }
    },
    context: {
      bigTitle: [
        'Contexto – Título'
      ],
      title: [
        'En esta pantalla se presenta una descripción general de lo que es el OVA, cómo está estructurado y qué componentes teóricos se muestran en el mismo. Esta pantalla es una bienvenida y una invitación para que el usuario aborde de manera adecuada el recurso.'
      ],
      detail: [
        'Lorem ipsum dolor sit amet, consectetuer adipiscing elit, sed diam nonummy nibh euismod tincidunt ut laoreet dolore magna aliquam erat volutpat. Ut wisi enim ad minim veniam, quis nostrud exerci tation ullamcorper suscipit lobortis nisl ut aliquip ex ea commodo consequat. Duis autem vel eum iriure dolor in hendrerit in vulputate velit esse molestie consequat, vel illum dolore eu feugiat nulla facilisis at vero eros et accumsan et iusto odio dignissim qui blandit praesent luptatum zzril delenit augue duis dolore te feugait nulla facilisi.',
        'Consectetuer adipiscing elit, sed diam nonummy nibh euismod tincidunt ut laoreet dolore magna aliquam erat volutpat. Ut wisi enim ad minim veniam, quis nostrud exerci tation ullamcorper suscipit lobortis nisl ut aliquip ex ea commodo consequat. Duis autem vel eum iriure dolor in hendrerit in vulputate velit esse molestie consequat, vel illum dolore eu feugiat.',
        'Lorem ipsum dolor sit amet, consectetuer adipiscing elit, sed diam nonummy nibh euismod tincidunt ut laoreet dolore magna aliquam erat volutpat. Ut wisi enim ad minim veniam, quis nostrud exerci tation ullamcorper suscipit lobortis nisl ut aliquip ex ea commodo consequat. Duis autem vel eum iriure dolor in hendrerit in vulputate velit esse molestie consequat, vel illum dolore eu feugiat nulla facilisis at vero eros et accumsan et iusto odio dignissim qui blandit praesent luptatum zzril delenit augue duis dolore te feugait nulla facilisi.',
        'Consectetuer adipiscing elit, sed diam nonummy nibh euismod tincidunt ut laoreet dolore magna aliquam erat volutpat. Ut wisi enim ad minim veniam, quis nostrud exerci tation ullamcorper suscipit lobortis nisl ut aliquip ex ea commodo consequat. Duis autem vel eum iriure dolor in hendrerit in vulputate velit esse molestie consequat, vel illum dolore eu feugiat.',
        'Lorem ipsum dolor sit amet, consectetuer adipiscing elit, sed diam nonummy nibh euismod tincidunt ut laoreet dolore magna aliquam erat volutpat. Ut wisi enim ad minim veniam, quis nostrud exerci tation ullamcorper suscipit lobortis nisl ut aliquip ex ea commodo consequat. Duis autem vel eum iriure dolor in hendrerit in vulputate velit esse molestie consequat, vel illum dolore eu feugiat nulla facilisis at vero eros et accumsan et iusto odio dignissim qui blandit praesent luptatum zzril delenit augue duis dolore te feugait nulla facilisi.',
        'Consectetuer adipiscing elit, sed diam nonummy nibh euismod tincidunt ut laoreet dolore magna aliquam erat volutpat. Ut wisi enim ad minim veniam, quis nostrud exerci tation ullamcorper suscipit lobortis nisl ut aliquip ex ea commodo consequat. Duis autem vel eum iriure dolor in hendrerit in vulputate velit esse molestie consequat, vel illum dolore eu feugiat.',
        'Lorem ipsum dolor sit amet, consectetuer adipiscing elit, sed diam nonummy nibh euismod tincidunt ut laoreet dolore magna aliquam erat volutpat. Ut wisi enim ad minim veniam, quis nostrud exerci tation ullamcorper suscipit lobortis nisl ut aliquip ex ea commodo consequat. Duis autem vel eum iriure dolor in hendrerit in vulputate velit esse molestie consequat, vel illum dolore eu feugiat nulla facilisis at vero eros et accumsan et iusto odio dignissim qui blandit praesent luptatum zzril delenit augue duis dolore te feugait nulla facilisi.',
        'Consectetuer adipiscing elit, sed diam nonummy nibh euismod tincidunt ut laoreet dolore magna aliquam erat volutpat. Ut wisi enim ad minim veniam, quis nostrud exerci tation ullamcorper suscipit lobortis nisl ut aliquip ex ea commodo consequat. Duis autem vel eum iriure dolor in hendrerit in vulputate velit esse molestie consequat, vel illum dolore eu feugiat.',
        'Lorem ipsum dolor sit amet, consectetuer adipiscing elit, sed diam nonummy nibh euismod tincidunt ut laoreet dolore magna aliquam erat volutpat. Ut wisi enim ad minim veniam, quis nostrud exerci tation ullamcorper suscipit lobortis nisl ut aliquip ex ea commodo consequat. Duis autem vel eum iriure dolor in hendrerit in vulputate velit esse molestie consequat, vel illum dolore eu feugiat nulla facilisis at vero eros et accumsan et iusto odio dignissim qui blandit praesent luptatum zzril delenit augue duis dolore te feugait nulla facilisi.',
        'Consectetuer adipiscing elit, sed diam nonummy nibh euismod tincidunt ut laoreet dolore magna aliquam erat volutpat. Ut wisi enim ad minim veniam, quis nostrud exerci tation ullamcorper suscipit lobortis nisl ut aliquip ex ea commodo consequat. Duis autem vel eum iriure dolor in hendrerit in vulputate velit esse molestie consequat, vel illum dolore eu feugiat.',
      ]
    },
    decisionMaking: [
      {
        type: 2,
        goodAnswerText: ['goodAnswerText 1'],
        badAnswerText: ['badAnswerText 1'],
        title: ['title 1'],
        detail: ['detail 1'],
        options: [
          {
            title: 'options/title 1',
            detail: 'options/detail 1'
          }
        ],
        answers: [1]
      },
      {
        type: 2,
        goodAnswerText: ['goodAnswerText 2'],
        badAnswerText: ['badAnswerText 2'],
        title: ['title 2'],
        detail: ['detail 2'],
        options: [
          {
            title: 'options/title 2',
            detail: 'options/detail 2'
          }
        ],
        answers: [1]
      },
    ],
    results: {
      detail: [
        'Lorem ipsum dolor sit amet, ***consectetuer adipiscing elit,*** sed diam nonummy nibh euismod tincidunt ut laoreet dolore magna aliquam erat volutpat. Ut wisi enim ad minim veniam, quis nostrud exerci tation ullamcorper suscipit lobortis nisl ut aliquip ex ea commodo consequat. Duis autem vel eum iriure dolor in hendrerit in vulputate velit esse.'
      ]
    }
  };

  setGeneratorValues(config);

  return config;
};

const setGeneratorValues = (newConfig={}) => {
  const values = JSON.stringify({
    ...getCurrentGeneratorValues(),
    ...newConfig
  });

  localStorage.setItem('generatorValues', values);

  return values;
};

const getCurrentGeneratorValues = () => JSON.parse(localStorage.getItem('generatorValues') || '{}');

const getGeneratorValues = () => {
  let currentValues = getCurrentGeneratorValues();

  if (!Object.keys(currentValues)?.length) {
    initializeGeneratorValues();
    currentValues = getCurrentGeneratorValues();
  }
  
  return currentValues;
};

const initializeGeneratorConstants = () => {
  tabs = document.querySelectorAll('.tab');
  mainForm = document.querySelector('.formGenerator');
  presentationInputs = document.querySelectorAll('.input');
  formGeneratorSections = document.querySelectorAll('.formGeneratorSection');
  formGeneratorSectionDecisionMaking = document.querySelector('.formGeneratorSection__decisionMaking');
  presentationInputsContainerMainTitle = document.querySelector('.presentation__inputsContainer--mainTitle');
  presentationInputsContainerSecundaryTitles = document.querySelector('.presentation__inputsContainer--secundaryTitles');
  presentationInputsContainerText = document.querySelector('.presentation__inputsContainer--text');
  presentationInputsContainer = document.querySelectorAll('.inputsContainer');

  addInputButtons = document.querySelectorAll('.addInputButton');
  removeInputButtons = document.querySelectorAll('.removeInputButton');
  addDecisionButtons = document.querySelectorAll('.addDecisionButton');
  removeDecisionButtons = document.querySelectorAll('.removeDecisionButton');
};

const removeActiveClassOfAllElements = (activeClass) => {
  const activeElements = document.querySelectorAll(`.${activeClass}`);
  activeElements?.forEach((element) => element.classList.remove(activeClass));
};

const addActiveClassToElement = (element, activeClass) => {
  element?.classList?.add(activeClass);
};

const updateActiveTab = (e) => {
  removeActiveClassOfAllElements(classActiveTab);
  addActiveClassToElement(e.target, classActiveTab);

  const nameSectionRelated = e.target.dataset?.nameSectionRelated;
  let newTabIndex = 0;
  tabs?.forEach((tab, i) => {
    if (tab.dataset.nameSectionRelated === nameSectionRelated) newTabIndex = i;
  })
  const currentValues = getCurrentGeneratorValues();
  currentValues.generator.currentTab = (newTabIndex + 1);
  setGeneratorValues(currentValues);
};

const updateActiveSection = (e) => {
  const nameSectionRelated = e.target.dataset.nameSectionRelated;
  const sectionToActive = document.querySelector(`.formGeneratorSection__${nameSectionRelated}`);

  removeActiveClassOfAllElements(classActiveSection);
  addActiveClassToElement(sectionToActive, classActiveSection);
};

const tabClicked = (e) => {
  updateActiveTab(e);
  updateActiveSection(e);
};

const getAllFormValues = (form) => {
  const data = new FormData(form);
  const obj = {};

  for (const key of data.keys()) {
    obj[key] = data.get(key);
  }

  return obj;
}

const generateOva = (e) => {
  e.preventDefault();

  const data = getAllFormValues(e.target);
  console.log('Form has: ', data);
};

const inputUpdated = (e) => {
  const { value, dataset } = e.currentTarget;
  const { inputProp, index } = dataset;
  const inputContainer = e.currentTarget.parentElement;
  const allInputsContainer = inputContainer.parentElement;
  const { formSection, formProp, formProp2, typeValue } = allInputsContainer?.dataset;
  const inputs = allInputsContainer.querySelectorAll('input');
  const currentValues = getCurrentGeneratorValues();

  if (!formProp2) {
    const isArray = Array.isArray(currentValues[formSection][formProp]);

    if (isArray) currentValues[formSection][formProp][index] = value;
    else currentValues[formSection][formProp] = value;
  }
  else {
    const isArray = Array.isArray(currentValues[formSection][formProp][formProp2]);

    if (isArray) {
      const valueIsAnObject = (typeValue === 'object');

      if (!valueIsAnObject) currentValues[formSection][formProp][formProp2][index] = value;
      else {
        currentValues[formSection][formProp][formProp2][index][inputProp] = value;
      }
    }
    else currentValues[formSection][formProp][formProp2] = value;
  }
  
  setGeneratorValues(currentValues);

  initializeGeneratorConstants();
  initializeEvents();
};

const removeInputButtonClicked = (e) => {
  const currentValues = getCurrentGeneratorValues();
  const typeValue = e.currentTarget?.dataset?.typeValue;
  const isAnObjectValue = (typeValue === 'object');
  const index = Number(e.currentTarget?.dataset?.index || 0);
  const { formSection, formProp, formProp2 } = e.currentTarget?.parentElement?.parentElement?.parentElement?.dataset;

  if (!formProp2) {
    const newArray = currentValues[formSection]?.[formProp]?.filter((_row, i) => (i !== index));
    if (newArray?.length) currentValues[formSection][formProp] = newArray;
    else {
      if (!isAnObjectValue) currentValues[formSection][formProp] = [''];
      else {
        const newObjectValue = {};
        Object.keys(currentValues[formSection]?.[formProp]?.[0])?.forEach((key) => { newObjectValue[key] = ''; })
        currentValues[formSection][formProp] = [newObjectValue];
      }
    }
  } else {
    const newArray = currentValues[formSection]?.[formProp]?.[formProp2]?.filter((_row, i) => (i !== index));

    if (newArray?.length) currentValues[formSection][formProp][formProp2] = newArray;
    else {
      if (!isAnObjectValue) currentValues[formSection][formProp][formProp2] = [''];
      else {
        const newObjectValue = {};
        Object.keys(currentValues[formSection]?.[formProp]?.[formProp2]?.[0])?.forEach((key) => { newObjectValue[key] = ''; })
        currentValues[formSection][formProp][formProp2] = [newObjectValue];
      }
    }
  }

  setGeneratorValues(currentValues);

  initializeMainValues();
};

const addInputButtonClicked = (e) => {
  const currentValues = getCurrentGeneratorValues();
  const typeValue = e.currentTarget?.dataset.typeValue;
  const isAnObjectValue = (typeValue === 'object');

  const index = Number(e.currentTarget?.dataset?.index || 0);
  const { formSection, formProp, formProp2 } = e.currentTarget?.parentElement?.parentElement?.parentElement?.dataset;

  if (!formProp2) {
    const newArray = [];
    currentValues[formSection]?.[formProp]?.forEach((row, i) => {
      newArray.push(row);

      if (i === index) {
        if (!isAnObjectValue) newArray.push('');
        else {
          const newObject = {};
          Object.keys(row).forEach((key) => { newObject[key] = ''; });
          newArray.push(newObject);
        }
      }
    });

    currentValues[formSection][formProp] = (newArray?.length) ? newArray : [''];
  } else {
    const newArray = [];
    currentValues[formSection]?.[formProp]?.[formProp2]?.forEach((row, i) => {
      newArray.push(row);
      if (i === index) {
        if (!isAnObjectValue) newArray.push('');
        else {
          const newObject = {};
          Object.keys(row).forEach((key) => { newObject[key] = ''; });
          newArray.push(newObject);
        }
      }
    });

    currentValues[formSection][formProp][formProp2] = (newArray?.length) ? newArray : [''];
  }

  setGeneratorValues(currentValues);

  initializeMainValues();
};

const setFormSubmitEvent = () => mainForm?.addEventListener('submit', generateOva);

const setTabsClickEvent = () => {
  tabs?.forEach((tab) => tab?.addEventListener('click', tabClicked));
};

const addDecisionButtonClicked = (e) => {
  const currentValues = getCurrentGeneratorValues();
  const decisionIndex = Number(e.target?.dataset?.decisionIndex || '0');
  debugger;
  
  let decisionMakings = [];
  currentValues.decisionMaking?.forEach((decision, i) => {
    decisionMakings.push(decision);

    if (i === decisionIndex) {
      const newObject = {};
      Object.keys(decision).forEach((key) => {
        const isArray = Array.isArray(decision[key]);

        if (isArray) {
          const isObject = (typeof decision[key][0] === 'object');

          if (!isObject) newObject[key] = [''];
          else {
            const newObject2 = {};
            Object.keys(decision[key][0])?.forEach((key) => newObject2[key] = '');
            newObject[key] = [newObject2];
          } 
        }
        else newObject[key] = '';
      });

      decisionMakings.push({ ...newObject, type: 2 });
    }
  });

  currentValues.decisionMaking = decisionMakings;
  setGeneratorValues(currentValues);

  initializeMainValues();
};

const removeDecisionButtonClicked = (e) => {
  const currentValues = getCurrentGeneratorValues();
  const decisionIndex = Number(e.target?.dataset?.decisionIndex || '0');

  let decisionMakings = [];

  if (currentValues.decisionMaking.length > 1) {
    currentValues.decisionMaking?.forEach((decision, i) => {
      if (i !== decisionIndex) decisionMakings.push(decision);
    });
  } else {
    const decision = currentValues.decisionMaking[0];

    const newObject = {};
    Object.keys(decision).forEach((key) => {
      const isArray = Array.isArray(decision[key]);

      if (isArray) {
        const isObject = (typeof decision[key][0] === 'object');

        if (!isObject) newObject[key] = [''];
        else {
          const newObject2 = {};
          Object.keys(decision[key][0])?.forEach((key) => newObject2[key] = '');
          newObject[key] = [newObject2];
        } 
      }
      else newObject[key] = '';
    });

    decisionMakings.push({ ...newObject, type: 2 });
  }

  currentValues.decisionMaking = decisionMakings;
  setGeneratorValues(currentValues);

  initializeMainValues();
};

const setAddInputButton = () => {
  addInputButtons?.forEach((addInputButton) => { addInputButton.addEventListener('click', addInputButtonClicked); });
  removeInputButtons?.forEach((removeInputButton) => { removeInputButton.addEventListener('click', removeInputButtonClicked); });

  addDecisionButtons?.forEach((button) => button.addEventListener('click', addDecisionButtonClicked));
  removeDecisionButtons?.forEach((button) => button.addEventListener('click', removeDecisionButtonClicked));

  presentationInputs?.forEach((input) => { input.addEventListener('keyup', inputUpdated); });
};

const initializeEvents = () => {
  setFormSubmitEvent();
  setTabsClickEvent();
  setAddInputButton();
};

const getInputSimpleHtml = (value = '') => (`
  <div class="inputContainer">
    <input type="text" class="input input--text" value="${value}">
  </div>
`);

const getInputSimple = (value) => {
  const html = getInputSimpleHtml(value);

  return html;
};

const getInputMultipleHtml = (value = '', index = 0) => (`
  <div class="inputContainer">
    <input type="text" class="input input--array" value="${value}" data-index="${index}">

    <div class="inputButtons">
      <button class="removeInputButton" type="button" data-index="${index}">
        <span class="removeInputButtonText">-</span>
      </button>

      <button class="addInputButton" type="button" data-index="${index}">
        <span class="addInputButtonText">+</span>
      </button>
    </div>
  </div>
`);

const getInputMultiple = (values = []) => {
  let html = '';

  if (!values?.length) html += getInputMultipleHtml();
  else values.forEach((value, i) => { html += getInputMultipleHtml(value, i); });

  return html;
};

const getInputMultipleAnswersHtml = (value = '', index = 0) => (`
  <div class="inputContainer">
    <input type="number" class="input input--text" style="width: auto; color: black; font-style: normal; font-size: 1rem; font-weight: bolder;" value="${value}" min="1" max="20" data-index="${index}">
  </div>
`);

const getInputMultipleAnswers = (values) => {
  let html = '';

  if (!values?.length) html += getInputMultipleAnswersHtml();
  else html += getInputMultipleAnswersHtml(values?.[0], 0);

  return html;
};

const getInputGlosaryHtml = ({ word, detail }, index = 0) => (`
  <div class="inputContainer">
    <input type="text" class="input input--multiplePropValue" value="${word}" data-index="${index}" data-input-prop="word" >
    <input type="text" class="input input--array" value="${detail}" data-index="${index}" data-input-prop="detail">

    <div class="inputButtons">
      <button class="removeInputButton" type="button" data-type-value="object" data-index="${index}">
        <span class="removeInputButtonText">-</span>
      </button>

      <button class="addInputButton" type="button" data-type-value="object" data-index="${index}">
        <span class="addInputButtonText">+</span>
      </button>
    </div>
  </div>
`);

const getInputThematicsHtml = ({ thematic, descripcion }, index = 0) => (`
  <div class="inputContainer">
    <input type="text" class="input input--multiplePropValue" value="${thematic}" data-index="${index}" data-input-prop="thematic">
    <input type="text" class="input input--array" value="${descripcion}" data-index="${index}" data-input-prop="descripcion">

    <div class="inputButtons">
      <button class="removeInputButton" type="button" data-type-value="object" data-index="${index}">
        <span class="removeInputButtonText">-</span>
      </button>

      <button class="addInputButton" type="button" data-type-value="object" data-index="${index}">
        <span class="addInputButtonText">+</span>
      </button>
    </div>
  </div>
`);

const getInputThematics = (values) => {
  let html = '';

  if (!values?.length) html += getInputThematicsHtml();
  else values.forEach((value, i) => { html += getInputThematicsHtml(value, i); });

  return html;
};

const getInputsDecisionMaking = (values) => {
  let html = '';

  if (!values?.length) html += getInputsDecisionMakingHtml();
  else values.forEach((value, i) => { html += getInputsDecisionMakingHtml(value, i); });

  return html;
};

const getInputGlosary = (values) => {
  let html = '';

  if (!values?.length) html += getInputGlosaryHtml();
  else values.forEach((value, i) => { html += getInputGlosaryHtml(value, i); });

  return html;
};

const getCustomHtml = (data) => {
  let value;
  const { formSection, formProp, formProp2, formProp3, typeInput } = data;
  const generatorValues = getGeneratorValues();

  if (formProp3) value = generatorValues?.[formSection]?.[formProp]?.[formProp2]?.[formProp3];
  else if (formProp2) value = generatorValues?.[formSection]?.[formProp]?.[formProp2];
  else if (formProp) value = generatorValues?.[formSection]?.[formProp];
  else value = generatorValues?.[formSection];

  if (typeInput === 'simple') return getInputSimple(value);
  if (typeInput === 'multiple') return getInputMultiple(value);
  if (typeInput === 'multipleAnswers') return getInputMultipleAnswers(value);
  if (typeInput === 'glosary') return getInputGlosary(value);
  if (typeInput === 'thematics') return getInputThematics(value);
  if (typeInput === 'decisionMakingOptions') return getDecisionMakingOptions(value);

  return '';
};

const initializeInputsContainer = () => {
  presentationInputsContainer?.forEach((inputContainer) => {
    inputContainer.innerHTML = getCustomHtml(inputContainer?.dataset);
  });
};

const getDecisionMakingOptionsHtml = ({ title, detail }, index = 0) => (`
  <div class="inputContainer">
    <label style="display: flex; align-items: center; justify-content: left; margin-right: 5px; font-weight: bolder; color: black;">
      ${index+1}. 
    </label>
    <input type="text" class="input input--multiplePropValue" value="${title}" data-index="${index}" data-input-prop="title">
    <input type="text" class="input input--array" value="${detail}" data-index="${index}" data-input-prop="detail">

    <div class="inputButtons">
      <button class="removeInputButton" type="button" data-type-value="object" data-index="${index}">
        <span class="removeInputButtonText">-</span>
      </button>

      <button class="addInputButton" type="button" data-type-value="object" data-index="${index}">
        <span class="addInputButtonText">+</span>
      </button>
    </div>
  </div>
`);

const getDecisionMakingOptions = (values) => {
  let html = '';

  if (!values?.length) html += getDecisionMakingOptionsHtml();
  else values.forEach((value, i) => { html += getDecisionMakingOptionsHtml(value, i); });

  return html;
};

const initializeDecisionMakingContainer = () => {
  let html = '';
  const generatorValues = getGeneratorValues();

  generatorValues.decisionMaking?.forEach((_decisionData, i) => {
    html += `
      <div class="decisionContainer">
        <h3 class="decisionMainTitle">
          <span class="addDecisionButton" data-decision-index="${i}">+</span>
          Decision ${i+1}
          <span class="removeDecisionButton" data-decision-index="${i}">-</span>
        </h3>

        <div class="decisionInputAndLabelContainer">
          <div class="inputAndLabelContainer" style="display: none;">
            <label class="inputLabel">Tipo:</label>
            <div class="inputsContainer" data-type-input="simple" data-form-section="decisionMaking" data-form-prop="${i}" data-form-prop2="type"></div>
          </div>

          <div class="inputAndLabelContainer">
            <label class="inputLabel">Título:</label>
            <div class="inputsContainer" data-type-input="multiple" data-form-section="decisionMaking" data-form-prop="${i}" data-form-prop2="title"></div>
          </div>

          <div class="inputAndLabelContainer">
            <label class="inputLabel">Descripción:</label>
            <div class="inputsContainer" data-type-input="multiple" data-form-section="decisionMaking" data-form-prop="${i}" data-form-prop2="detail"></div>
          </div>

          <div class="inputAndLabelContainer">
            <label class="inputLabel">Opciones (Titulo/detalle):</label>
            <div class="inputsContainer" data-type-input="decisionMakingOptions" data-form-section="decisionMaking" data-form-prop="${i}" data-form-prop2="options" data-type-value="object"></div>
          </div>

          <div class="inputAndLabelContainer">
            <label class="inputLabel">Número de la respuesta correcta:</label>
            <div class="inputsContainer" data-type-input="multipleAnswers" data-form-section="decisionMaking" data-form-prop="${i}" data-form-prop2="answers"></div>
          </div>

          <div class="inputAndLabelContainer" style="margin-top: 0">
            <label class="inputLabel">El usuario acertó (texto):</label>
            <div class="inputsContainer" data-type-input="multiple" data-form-section="decisionMaking" data-form-prop="${i}" data-form-prop2="goodAnswerText"></div>
          </div>

          <div class="inputAndLabelContainer">
            <label class="inputLabel">El usuario se equivocó (texto):</label>
            <div class="inputsContainer" data-type-input="multiple" data-form-section="decisionMaking" data-form-prop="${i}" data-form-prop2="badAnswerText"></div>
          </div>
        </div>
      </div>
    `;
  });

  formGeneratorSectionDecisionMaking.innerHTML = html;
};

const initializeData = () => {
  initializeDecisionMakingContainer();
  initializeGeneratorConstants();
  initializeInputsContainer();

  initializeGeneratorConstants();
};

const initializeMainValues = () => {
  initializeGeneratorConstants();
  initializeData();
  initializeEvents();

  const currentValues = getCurrentGeneratorValues();
  const tabIndex = (currentValues?.generator?.currentTab || 1) - 1;

  tabs?.[tabIndex]?.click();
};

const pageReady = () => {
  initializeMainValues();
};

document.addEventListener('DOMContentLoaded', pageReady);