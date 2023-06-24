'use client'

import { useState, useEffect } from 'react'
import Image from 'next/image'
import { useRouter } from 'next/navigation';

export default function MiddleContent() {
  const levels = [
    {name: '', slug: 'ice-breakers'},
    {name: 'Ice Breakers', slug: 'ice-breakers'},
    {name: 'Confessions', slug: 'confessions'},
    {name: 'Getting Deep', slug: 'getting-deep'},
    {name: '∞', slug: 'infinite'},
  ]
  const levelSteps = [
    'Start',
    'Next'
  ]
  const [imageContent, setImageContent] = useState('how-deep')
  const [imageCount, setImageCount] = useState(0)
  const [levelImageCount, setLevelImageCount] = useState(0)
  const [levelStep, setLevelStep] = useState(0)
  const [level, setLevel] = useState(0)
  const router = useRouter();

  useEffect(() => {
    if (imageCount == 0) {
      return
    }
    if (level === 5) {
      return
    }
    setImageContent(`${levels[level].slug}/${levels[level].slug}-${imageCount}`)
  }, [imageCount, level])

  useEffect(() => {
    if (levelImageCount === 0) {
      return
    }
    if (levelImageCount === 1) {
      setLevel(level + 1)
    }
    setImageCount(Math.floor(Math.random() * 11) + 1)
  }, [levelImageCount])

  useEffect(() => {
    if (level === 5) {
      window.location.reload()
    }
  }, [level])

  return (
    <main className="flex min-h-screen flex-col items-center justify-between p-24">
      <h2 className={`mb-3 text-2xl font-semibold`}>
        {(levels[level] && levels[level].name) ? levels[level].name : ''}
      </h2>
      <div className="relative flex place-items-center before:absolute before:h-[300px] before:w-[480px] before:-translate-x-1/2 before:rounded-full before:bg-gradient-radial before:from-white before:to-transparent before:blur-2xl before:content-[''] after:absolute after:-z-20 after:h-[180px] after:w-[240px] after:translate-x-1/3 after:bg-gradient-conic after:from-sky-200 after:via-blue-200 after:blur-2xl after:content-[''] before:dark:bg-gradient-to-br before:dark:from-transparent before:dark:to-blue-700 before:dark:opacity-10 after:dark:from-sky-900 after:dark:via-[#0141ff] after:dark:opacity-40 before:lg:h-[360px]">
        <Image
          className="relative dark:drop-shadow-[0_0_0.3rem_#ffffff70] dark:invert"
          src={`/${imageContent}.png`}
          alt="Card image"
          width={380}
          height={537}
          priority
        />
      </div>

      <div className="text-center">
        <button onClick={() => {
          if (levelImageCount === 3) {
            setLevelImageCount(1)
            return
          }
          setLevelImageCount(levelImageCount + 1)
        }}
          className="group rounded-lg border border-transparent px-5 py-4 transition-colors"
        >
          <h2 className={`mb-3 text-2xl font-semibold`}>
            {levelSteps[levelStep]}
            <span className="inline-block transition-transform group-hover:translate-x-1 motion-reduce:transform-none">
              -&gt;
            </span>
          </h2>
          <p className={`m-0 max-w-[30ch] text-sm opacity-50`}>
            Three levels of carefully crafted question cards to dig deeper, made online.
          </p>
        </button>

      </div>
    </main>
  )
}
