/* *
 * This sample demonstrates handling intents from an Alexa skill using the Alexa Skills Kit SDK (v2).
 * Please visit https://alexa.design/cookbook for additional examples on implementing slots, dialog management,
 * session persistence, api calls, and more.
 * */
const Alexa = require('ask-sdk-core');
const i18n = require('i18next');
const sprintf = require('i18next-sprintf-postprocessor');


const languageStrings = {
  en: {
    translation: {
      WELCOME_MESSAGE: 'Welcome to Motorcycle Trivia! You can request a fun fact by saying "tell me a motorcycle fact". If you need help with the phrases to interact with the skill, say "help". To stop, simply say "Cancel!"',
      FACTS: [
        'The fastest motorcycle in the world is the Dodge Tomahawk, which can reach speeds of up to 350 mph.',
        'The longest motorcycle in the world is over 26 feet long.',
        'The first motorcycle was invented by Gottlieb Daimler and Wilhelm Maybach in 1885.',
        'Harley-Davidson\'s first motorcycle was built in a small wooden shed.',
        'The largest motorcycle parade consisted of 24,000 motorcycles.',
        'In 2018, there were over 13 million motorcycles registered in the United States.',
        'The most expensive motorcycle ever sold was the Neiman Marcus Limited Edition Fighter, which sold for $11 million.',
        'Valentino Rossi is one of the most successful motorcycle racers, with nine Grand Prix World Championships.',
        'The first motorcycle speed record was set in 1907, reaching a speed of 136.3 km/h (84.4 mph).',
        'The heaviest motorcycle in the world is the Leonhardt Gunbus 410, weighing 1,433 pounds.',
        'Motorcycles were extensively used during World War I and World War II for transportation and communication.',
        'In Japan, Honda produces over 18 million motorcycles per year, making it the largest manufacturer in the world.',
        'The famous Vespa scooter was launched in 1946 and quickly became a cultural icon.',
        'In some Asian countries, motorcycles are the most common means of transportation, with millions of units in circulation.',
        'The 1963 movie "The Great Escape" made the Triumph TR6 Trophy motorcycle famous thanks to the iconic jump scene performed by Steve McQueen.',
        'Electric motorcycles are gaining popularity due to their energy efficiency and lower environmental impact.'
      ],
      HELP_MESSAGE: 'You can ask for a motorcycle fact, phrases you can use include "tell me a fact about motorcycles","a curious fact about motorcycles", "what is a fun fact about motorcycles", "what is an interesting fact about motorcycles", "tell me something about motorcycles", "I want to hear a fact about motorcycles". How can I help you?',
      GOODBYE_MESSAGE: 'Goodbye!',
      FALLBACK_MESSAGE: 'Sorry, I don\'t know about that. Please try again.',
      ERROR_MESSAGE: 'Sorry, there was an error. Please try again.',
      GET_FRASES_MSG: 'Here is a motorcycle fact: ',
      OtroDato: '... You can request another fun fact about motorcycles by saying, "tell me another motorcycle fact" or if you need help with the phrases to interact with the skill, say "help". To stop, simply say "Cancel!"'
    }
  },
  es: {
    translation: {
      WELCOME_MESSAGE: '¡Bienvenido a Curiosidades de Motocicletas! Puedes pedir un dato curioso diciendo "dime un dato sobre motocicletas". Si necesitas ayuda con las frases para interactuar con la skill, di "ayuda". Para detener, simplemente di "¡Cancelar!"',
      FACTS: [
        'La motocicleta más rápida del mundo es la Dodge Tomahawk, que puede alcanzar velocidades de hasta 350 mph.',
        'La motocicleta más larga del mundo mide más de 26 pies.',
        'La primera motocicleta fue inventada por Gottlieb Daimler y Wilhelm Maybach en 1885.',
        'La primera motocicleta de Harley-Davidson fue construida en un pequeño cobertizo de madera.',
        'El desfile de motocicletas más grande consistió en 24,000 motocicletas.',
        'En 2018, había más de 13 millones de motocicletas registradas en Estados Unidos.',
        'La motocicleta más cara jamás vendida fue la Neiman Marcus Limited Edition Fighter, que se vendió por $11 millones.',
        'Valentino Rossi es uno de los corredores de motocicletas más exitosos, con nueve campeonatos mundiales de Grand Prix.',
        'El primer récord de velocidad en una motocicleta fue establecido en 1907 y alcanzó una velocidad de 136.3 km/h.',
        'La motocicleta más pesada del mundo es la Leonhardt Gunbus 410, que pesa 1,433 libras.',
        'Las motocicletas fueron utilizadas extensamente durante la Primera y Segunda Guerra Mundial para transporte y comunicación.',
        'En Japón, la marca Honda produce más de 18 millones de motocicletas al año, lo que la convierte en el mayor fabricante del mundo.',
        'La famosa motocicleta Vespa se lanzó al mercado en 1946 y rápidamente se convirtió en un ícono cultural.',
        'En algunos países asiáticos, las motocicletas son el medio de transporte más común, con millones de unidades en circulación.',
        'La película "The Great Escape" de 1963 hizo famosa a la motocicleta Triumph TR6 Trophy gracias a la icónica escena de salto protagonizada por Steve McQueen.',
        'Las motocicletas eléctricas están ganando popularidad por su eficiencia energética y menor impacto ambiental.'
      ],
      HELP_MESSAGE: 'Puedes pedir un dato sobre motocicletas, frases que puedes ocupar "dime un dato sobre motocicletas", "un dato curioso sobre motocicletas", "cual es un dato curioso sobre motocicletas", "dime algo sobre motocicletas", "quiero escuchar un dato sobre motocicletas". Cómo te puedo ayudar?',
      GOODBYE_MESSAGE: '¡Adiós!',
      FALLBACK_MESSAGE: 'Lo siento, no sé sobre eso. Por favor intenta de nuevo.',
      ERROR_MESSAGE: 'Lo siento, hubo un error. Por favor intenta de nuevo.',
      GET_FRASES_MSG: 'Aquí tienes un dato sobre motocicletas: ',
      OtroDato: ' ... Puedes pedir otro dato curioso de las motocicletas diciendo, "dime un dato curioso sobre motocicletas" o si necesitas ayuda con las frases para interactuar con la skill, di "ayuda". Para detener, simplemente di "¡Cancelar!"',
    }
  }
}


const LaunchRequestHandler = {
    canHandle(handlerInput) {
        return Alexa.getRequestType(handlerInput.requestEnvelope) === 'LaunchRequest';
    },
    handle(handlerInput) {
        const requestAttributes = handlerInput.attributesManager.getRequestAttributes();
        const speakOutput = requestAttributes.t('WELCOME_MESSAGE');

        return handlerInput.responseBuilder
            .speak(speakOutput)
            .reprompt(speakOutput)
            .getResponse();
    }
};

const HelloWorldIntentHandler = {
    canHandle(handlerInput) {
        return Alexa.getRequestType(handlerInput.requestEnvelope) === 'IntentRequest'
            && Alexa.getIntentName(handlerInput.requestEnvelope) === 'HelloWorldIntent';
    },
    handle(handlerInput) {
        const requestAttributes = handlerInput.attributesManager.getRequestAttributes();
        const speakOutput = requestAttributes.t('HELLO_MESSAGE');

        return handlerInput.responseBuilder
            .speak(speakOutput)
            //.reprompt('add a reprompt if you want to keep the session open for the user to respond')
            .getResponse();
    }
};


const FrasesIntentHandler = {
  canHandle(handlerInput) {
    return Alexa.getRequestType(handlerInput.requestEnvelope) === 'IntentRequest'
      && Alexa.getIntentName(handlerInput.requestEnvelope) === 'FrasesIntent';
  },
  handle(handlerInput) {
    const requestAttributes = handlerInput.attributesManager.getRequestAttributes();
    const facts = requestAttributes.t('FACTS');
    const fact = facts[Math.floor(Math.random() * facts.length)];
    const speakOutput = requestAttributes.t('GET_FRASES_MSG') + fact + requestAttributes.t('OtroDato') ;

    return handlerInput.responseBuilder
      .speak(speakOutput)
      .reprompt('Puedes pedir otro dato curioso de las motocicletas o decir "¡Cancela!" para detenerme.')
      .getResponse();
  }
};

const HelpIntentHandler = {
    canHandle(handlerInput) {
        return Alexa.getRequestType(handlerInput.requestEnvelope) === 'IntentRequest'
            && Alexa.getIntentName(handlerInput.requestEnvelope) === 'AMAZON.HelpIntent';
    },
    handle(handlerInput) {
        const requestAttributes = handlerInput.attributesManager.getRequestAttributes();
        const speakOutput = requestAttributes.t('HELP_MESSAGE');
        

        return handlerInput.responseBuilder
            .speak(speakOutput)
            .reprompt(speakOutput)
            .getResponse();
    }
};

const CancelAndStopIntentHandler = {
    canHandle(handlerInput) {
        return Alexa.getRequestType(handlerInput.requestEnvelope) === 'IntentRequest'
            && (Alexa.getIntentName(handlerInput.requestEnvelope) === 'AMAZON.CancelIntent'
                || Alexa.getIntentName(handlerInput.requestEnvelope) === 'AMAZON.StopIntent');
    },
    handle(handlerInput) {
        const requestAttributes = handlerInput.attributesManager.getRequestAttributes();
        const speakOutput = requestAttributes.t('GOODBYE_MESSAGE');

        return handlerInput.responseBuilder
            .speak(speakOutput)
            .getResponse();
    }
};
/* *
 * FallbackIntent triggers when a customer says something that doesn’t map to any intents in your skill
 * It must also be defined in the language model (if the locale supports it)
 * This handler can be safely added but will be ingnored in locales that do not support it yet 
 * */
const FallbackIntentHandler = {
    canHandle(handlerInput) {
        return Alexa.getRequestType(handlerInput.requestEnvelope) === 'IntentRequest'
            && Alexa.getIntentName(handlerInput.requestEnvelope) === 'AMAZON.FallbackIntent';
    },
    handle(handlerInput) {
        const requestAttributes = handlerInput.attributesManager.getRequestAttributes();
        const speakOutput = requestAttributes.t('FALLBACK_MESSAGE');
        

        return handlerInput.responseBuilder
            .speak(speakOutput)
            .reprompt(speakOutput)
            .getResponse();
    }
};
/* *
 * SessionEndedRequest notifies that a session was ended. This handler will be triggered when a currently open 
 * session is closed for one of the following reasons: 1) The user says "exit" or "quit". 2) The user does not 
 * respond or says something that does not match an intent defined in your voice model. 3) An error occurs 
 * */
const SessionEndedRequestHandler = {
    canHandle(handlerInput) {
        return Alexa.getRequestType(handlerInput.requestEnvelope) === 'SessionEndedRequest';
    },
    handle(handlerInput) {
        console.log(`~~~~ Session ended: ${JSON.stringify(handlerInput.requestEnvelope)}`);
        // Any cleanup logic goes here.
        return handlerInput.responseBuilder.getResponse(); // notice we send an empty response
    }
};
/* *
 * The intent reflector is used for interaction model testing and debugging.
 * It will simply repeat the intent the user said. You can create custom handlers for your intents 
 * by defining them above, then also adding them to the request handler chain below 
 * */
const IntentReflectorHandler = {
    canHandle(handlerInput) {
        return Alexa.getRequestType(handlerInput.requestEnvelope) === 'IntentRequest';
    },
    handle(handlerInput) {
        const intentName = Alexa.getIntentName(handlerInput.requestEnvelope);
        const speakOutput = `You just triggered ${intentName}`;

        return handlerInput.responseBuilder
            .speak(speakOutput)
            //.reprompt('add a reprompt if you want to keep the session open for the user to respond')
            .getResponse();
    }
};
/**
 * Generic error handling to capture any syntax or routing errors. If you receive an error
 * stating the request handler chain is not found, you have not implemented a handler for
 * the intent being invoked or included it in the skill builder below 
 * */
const ErrorHandler = {
    canHandle() {
        return true;
    },
    handle(handlerInput, error) {
        const speakOutput = 'Sorry, I had trouble doing what you asked. Please try again.';
        console.log(`~~~~ Error handled: ${JSON.stringify(error)}`);

        return handlerInput.responseBuilder
            .speak(speakOutput)
            .reprompt(speakOutput)
            .getResponse();
    }
};




// This request interceptor will log all incoming requests to this lambda
const LoggingRequestInterceptor = {
    process(handlerInput) {
        console.log(`Incoming request: ${JSON.stringify(handlerInput.requestEnvelope.request)}`);
    }
};


// This response interceptor will log all outgoing responses of this lambda
const LoggingResponseInterceptor = {
    process(handlerInput, response) {
      console.log(`Outgoing response: ${JSON.stringify(response)}`);
    }
};

// This request interceptor will bind a translation function 't' to the requestAttributes.
const LocalizationInterceptor = {
  process(handlerInput) {
    const localizationClient = i18n.use(sprintf).init({
      lng: handlerInput.requestEnvelope.request.locale,
      fallbackLng: 'en',
      overloadTranslationOptionHandler: sprintf.overloadTranslationOptionHandler,
      resources: languageStrings,
      returnObjects: true
    });

    const attributes = handlerInput.attributesManager.getRequestAttributes();
    attributes.t = function (...args) {
      return localizationClient.t(...args);
    }
  }
}


/**
 * This handler acts as the entry point for your skill, routing all request and response
 * payloads to the handlers above. Make sure any new handlers or interceptors you've
 * defined are included below. The order matters - they're processed top to bottom 
 * */
exports.handler = Alexa.SkillBuilders.custom()
    .addRequestHandlers(
        LaunchRequestHandler,
        HelloWorldIntentHandler,
        FrasesIntentHandler,
        HelpIntentHandler,
        CancelAndStopIntentHandler,
        FallbackIntentHandler,
        SessionEndedRequestHandler,
        IntentReflectorHandler)
    .addErrorHandlers(
        ErrorHandler)
        .addRequestInterceptors(
        LocalizationInterceptor,
        LoggingRequestInterceptor)
    .addResponseInterceptors(
        LoggingResponseInterceptor)
    .withCustomUserAgent('sample/hello-world/v1.2')
    .lambda();