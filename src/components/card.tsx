import React, { useEffect, useState } from 'react';

export default function Card({children}: CardProps) {
  return <div className="max-w-screen-md mx-auto bg-white dark:bg-gray-700 px-3 sm:px-10 py-4 sm:py-7 sm:pb-10 rounded shadow space-y-2 relative dark:border dark:border-sky-400">
    {children}
  </div>
}

type CardProps = {
  children: React.ReactNode
}

export function WotdCard({word}: WotdCardProps) {
  let [definitionExpanded, setDefinitionExpanded] = useState(false);
  let [definition, setDefinition] = useState([]);
  
  useEffect(() => {
    fetch(`https://api.dictionaryapi.dev/api/v2/entries/en/${word.toLowerCase()}`)
      .then(res => res.json())
      .then(setDefinition);
  }, [word]);
  
  return <Card>
    <h3 className="font-light text-lg sm:text-xl dark:text-white">
      Today's word:
      <span className="font-mono text-sky-900 dark:text-white bg-gradient-to-r from-sky-100 to-cyan-50 dark:from-sky-600 dark:to-cyan-500 p-1 rounded sm:text-lg ml-1">
        {word}
      </span>
    </h3>
    {definitionExpanded && 
      (definition ? <Definition data={definition} /> : "Loading...")
    }
    <button className="w-full sm:w-auto sm:absolute sm:bottom-0 sm:translate-y-1/2 sm:left-1/2 sm:-translate-x-1/2 bg-white dark:bg-gray-700 sm:px-4 pt-1.5 sm:py-1.5 sm:rounded-full sm:border dark:border-sky-400 sm:shadow-sm space-x-2 cursor-pointer sm:hover:bg-gray-50 dark:sm:hover:bg-sky-400 flex items-center sm:justify-center" onClick={() => setDefinitionExpanded(!definitionExpanded)}>
      <span className="font-light text-sky-700 sm:text-black dark:text-cyan-300 sm:dark:text-white">{definitionExpanded ? "- Hide definition" : "+ Show definition"}</span>
    </button>
  </Card>
}

type WotdCardProps = {
  word: String,
}

function Definition({data}: DefinitionProps) {
  return <div className='space-y-3'>
    {data.map(entry => <>
      <p className="text-gray-800 font-light dark:text-white text-sm sm:text-base">{entry.phonetic}</p>
      {entry.meanings.map(meaning => <>
        <p className="italic font-light text-gray-600 dark:text-white text-sm sm:text-base">{meaning.partOfSpeech}</p>
        <ol className="space-y-3 list-decimal pl-5 text-xs font-light dark:text-white">
          {meaning.definitions.map(definition => <li className="space-y-2">
            <p className="font-light text-sm sm:text-base dark:text-white">{definition.definition}</p>
            <p className="text-gray-700 font-medium text-sm sm:text-base dark:text-white">"{definition.example}"</p>
            {definition.synonyms.length > 0 && 
              <p className="space-x-1 space-y-2 flex items-baseline flex-wrap">
                <span className="text-sky-800 text-xs sm:text-sm dark:text-white">Similar:</span>
                {definition.synonyms.map(synonym => <span className="py-1 px-2.5 text-xs border dark:border-gray-300 dark:text-white rounded-full from-sky-400 to-cyan-500">{synonym}</span>)}
              </p>
            }
          </li>)}
        </ol>
      </>)}
    </>)}
  </div>
}

interface DefinitionData {
  word: String,
  phonetic: String,
  phonetics: {
    text: String,
    audio?: String
  }[],
  origin: String,
  meanings: {
    partOfSpeech: String,
    definitions: {
      definition: String,
      example: String
      synonyms: String[],
      antonyms: String[],
    }[]
  }[]
}

type DefinitionProps = {
  data: DefinitionData[]
}