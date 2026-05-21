// Textos oficiales del Anexo 1
const textos = {
    1: "En los mares y océanos viven muchísimas especies de animales y plantas. Entre ellos, unos de los más simpáticos y bonitos son los delfines.\n\nLos delfines viven en el mar, pero no son peces, sino mamíferos.\n\nAl nadar van sacando los lomos, con su aleta, siempre en grupos. Y cuando están contentos dan grandes saltos fuera del agua.\n\nCuando se sumergen bajo el agua aguantan la respiración, como hacemos los seres humanos.\n\nSu hocico termina en punta y les sirve para defenderse de sus enemigos, incluso de los tiburones. Se impulsan con fuerza y golpean con su trompa a sus enemigos.",
    
    2: "Ramón era un niño al que todo le preocupaba: los sombreros, los zapatos, las nubes, la lluvia o que unos pájaros enormes vinieran por él y se lo llevaran; su mamá y su papá le decían que no se preocupara, pero seguía preocupado.\n\nUn día Ramón no podía dormir. Su abuelita le preguntó: ¿Por qué no puedes dormir? Y él le explicó que todo le preocupaba. Ella le trajo unos muñequitos de madera y tela llamados \"quitapesares\". Le explicó que si les contaba lo que le preocupaba y los ponía bajo la almohada podría dormir mejor. Ellos lo cuidarían.\n\nRamón lo hizo así y durmió muy tranquilo.",
    
    3: "Todas las noches pasaba lo mismo. Martín apagaba la luz y, cuando comenzaba a quedarse dormido, un ruido lo despertaba. Como todo estaba tan oscuro, Martín no podía ver quién lo producía. Le daba mucho susto oír como el ruido iba de un lado a otro por toda su pieza. El caso es que no lograba dormir hasta bien entrada la noche.\n\nLo único que lo calmaba, y a veces hasta lo entretenía, era el pensamiento de que seguramente no se trataba de un dragón ni de un tigre, pues el ruido que hacía era muy quedito. Pero, ¿y si era una tarántula, un alacrán grandote o una víbora de cascabel? ¡Qué miedo! Aquello no podía seguir así.\n\nUn buen día, o mejor dicho, una buena noche en la que el ruidito había vuelto a escucharse, se armó de todo su valor y decidió enfrentar el peligro. Encendió la luz, y... ¡Era un ratoncito! ¡Qué alivio le dio saber que no era ningún animal enojón o maligno! El pobre ratón temblaba. Sin hacer ruido, Martín fue hasta la cocina y trajo un pedazo de queso. Y sobra decir que desde esa noche el niño y el ratón se hicieron amigos.\n\nMartín estaba seguro de que el ratoncito había sonreído cuando le propuso llamarlo Nicolás."
};

// Preguntas de comprensión por grado (oficiales del Anexo 1)
const preguntasComprension = {
    1: [
        { tipo: "abierta", texto: "¿De qué trata la lectura?" },
        { tipo: "multiple", texto: "¿Qué hacen los delfines cuando están contentos?", 
          opciones: ["a) Nadan en el mar y los océanos", "b) Se sumergen bajo el agua", "c) Dan grandes saltos fuera del agua"], 
          correcta: 2 },
        { tipo: "multiple", texto: "¿Para qué les sirve tener su hocico en punta?", 
          opciones: ["a) Para respirar abajo del agua", "b) Para defenderse de sus enemigos", "c) Para comer peces"], 
          correcta: 1 }
    ],
    2: [
        { tipo: "abierta", texto: "¿De qué trata la lectura?" },
        { tipo: "multiple", texto: "¿Por qué no podía dormir Ramón?", 
          opciones: ["a) Porque no tenía sueño", "b) Porque tenía pesadillas", "c) Porque todo le preocupaba"], 
          correcta: 2 },
        { tipo: "multiple", texto: "¿Qué hizo su abuelita para que Ramón durmiera tranquilo?", 
          opciones: ["a) Puso unos 'quitapesares' debajo de su almohada", "b) Le dio unos muñequitos de madera y tela para que les contara sus preocupaciones", "c) Le dijo que no se preocupara y que se lo contara a sus papás"], 
          correcta: 1 }
    ],
    3: [
        { tipo: "abierta", texto: "¿De qué trata la lectura?" },
        { tipo: "abierta", texto: "¿Por qué no lograba dormir Martín?" },
        { tipo: "abierta", texto: "¿Qué era lo único que calmaba a Martín en la noche?" },
        { tipo: "abierta", texto: "¿Quién es Nicolás?" },
        { tipo: "abierta", texto: "¿Por qué Martín fue a la cocina sin hacer ruido?" }
    ]
};

// Descripciones de la rúbrica (para mostrar al seleccionar nivel)
const descripcionesRubrica = {
    fluidez: {
        3: "Lee palabras y frases completas. Respeta los signos de puntuación.",
        2: "Lee agrupando dos o tres palabras. Respeta sólo algunos signos de puntuación.",
        1: "Reconoce sólo algunas letras o sílabas aisladamente. Presenta errores y pausas que hacen poco entendible la lectura."
    },
    precision: {
        3: "Lee correctamente las palabras. Comete sólo 2 o 3% de errores. No incorpora, sustituye ni omite palabras.",
        2: "Presenta entre 4 y 6% de errores (agrega, sustituye, omite o invierte sílabas o palabras).",
        1: "Tiene más de 7% de errores. Invierte sílabas o palabras."
    },
    atencionPalabras: {
        3: "Lee pausadamente las palabras desconocidas o complejas a fin de no equivocarse.",
        2: "Se detiene en algunas palabras complejas. Corrige algunas de ellas en las que se equivoca.",
        1: "Se equivoca, no corrige o lo hace de manera inadecuada y continua leyendo."
    },
    usoVoz: {
        3: "Da la entonación y volumen apropiados al leer. Da la dicción adecuada en cada palabra.",
        2: "Da entonación y volumen apropiados sólo en algunas partes de la lectura. Presenta algunos errores de dicción.",
        1: "Lee de manera monótona o inaudible. Presenta mala dicción de las palabras."
    },
    seguridad: {
        3: "Manifiesta disposición y seguridad al leer. Disfruta la lectura.",
        2: "Muestra rasgos de tensión pero no interfiere con su lectura. El texto no le es fácil pero puede manejarlo.",
        1: "Muestra inseguridad ante la lectura, lo que interfiere en su desempeño. Se observa apatía o desinterés."
    }
};

const recomendacionesPorComponente = {
    fluidez: "Practicar lectura en voz alta con frases cortas. Usar separación de palabras con tarjetas.",
    precision: "Realizar ejercicios de repetición de palabras y lectura de listas.",
    atencionPalabras: "Enseñar estrategias de autocorrección y lectura pausada.",
    usoVoz: "Modelar entonación y volumen. Leer cuentos con diálogos.",
    seguridad: "Fomentar un ambiente relajado. Lecturas cortas y gratificantes.",
    comprension: "Hacer preguntas simples después de leer. Dibujar lo que entendió."
};