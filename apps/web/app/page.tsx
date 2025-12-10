'use client'

import { useState } from 'react'
import { Button } from '@/components/ui/button'
import { Textarea } from '@/components/ui/textarea'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { Card } from '@/components/ui/card'
import { Loader2, Copy, CheckCheck } from 'lucide-react'

export default function CorporateSpeakTranslator() {
  const [context, setContext] = useState('')
  const [phrase, setPhrase] = useState('')
  const [response, setResponse] = useState('')
  const [isLoading, setIsLoading] = useState(false)
  const [isCopied, setIsCopied] = useState(false)

  const handleTranslate = async () => {
    if (!phrase.trim()) return

    setIsLoading(true)
    setResponse('')
    setIsCopied(false)

    const response = await fetch(
      'https://0vyy3tt0kg.execute-api.us-east-1.amazonaws.com/generate-corporate-speak',
      {
        method: 'POST',
        body: JSON.stringify({ context, phrase }),
      }
    )

    const data = await response.json()

    setResponse(data[0].text)
    setIsLoading(false)
  }

  const handleCopy = async () => {
    if (response) {
      await navigator.clipboard.writeText(response)
      setIsCopied(true)
      setTimeout(() => setIsCopied(false), 2000)
    }
  }

  return (
    <div className='min-h-screen flex flex-col bg-background'>
      <div className='fixed inset-0 -z-10 bg-[radial-gradient(ellipse_at_top,_var(--tw-gradient-stops))] from-primary/5 via-background to-background' />

      {/* Header */}
      <header className='border-b border-border backdrop-blur-sm bg-background/80'>
        <div className='container mx-auto px-4 py-8 md:py-12'>
          <div className='inline-block px-3 py-1 mb-4 text-xs font-semibold rounded-full bg-primary/10 text-primary border border-primary/20'>
            AI-Powered Translation
          </div>
          <h1 className='text-4xl md:text-6xl font-bold tracking-tight text-foreground text-balance'>
            Corporate Speak Translator
          </h1>
          <p className='mt-4 text-lg md:text-xl text-muted-foreground max-w-2xl text-pretty'>
            Transform your thoughts into perfectly polished corporate
            communication. Because sometimes you need to say "no" in seventeen
            professional words instead of one.
          </p>
        </div>
      </header>

      {/* Main Content */}
      <main className='flex-1 container mx-auto px-4 py-8 md:py-12'>
        <div className='max-w-3xl mx-auto space-y-8'>
          {/* Context Input (Optional) */}
          <div className='space-y-3'>
            <Label
              htmlFor='context'
              className='text-sm font-medium text-foreground'
            >
              Context (optional)
            </Label>
            <Textarea
              id='context'
              placeholder='Paste what your colleague said, or provide additional context...'
              className='min-h-[120px] resize-y bg-card border-border text-foreground shadow-sm hover:shadow-md transition-shadow'
              value={context}
              onChange={(e) => setContext(e.target.value)}
            />
          </div>

          {/* Main Phrase Input */}
          <div className='space-y-3'>
            <Label
              htmlFor='phrase'
              className='text-sm font-medium text-foreground flex items-center gap-2'
            >
              <span className='inline-flex items-center justify-center w-5 h-5 rounded-full bg-primary/10 text-primary text-xs'>
                ✨
              </span>
              In corporate speak, how do I say
            </Label>
            <Input
              id='phrase'
              placeholder="that's not my job"
              className='text-base bg-card border-border text-foreground shadow-sm hover:shadow-md transition-shadow'
              value={phrase}
              onChange={(e) => setPhrase(e.target.value)}
              onKeyDown={(e) => {
                if (e.key === 'Enter' && !isLoading) {
                  handleTranslate()
                }
              }}
            />
          </div>

          {/* Generate Button */}
          <Button
            onClick={handleTranslate}
            disabled={isLoading || !phrase.trim()}
            className='w-full md:w-auto px-8 py-6 text-base font-medium bg-primary hover:bg-primary/90 shadow-lg hover:shadow-xl transition-all'
            size='lg'
          >
            {isLoading ? (
              <>
                <Loader2 className='mr-2 h-5 w-5 animate-spin' />
                Translating...
              </>
            ) : (
              'Translate to Corporate Speak'
            )}
          </Button>

          {/* Response Display */}
          {response && (
            <Card className='p-6 bg-card border-l-4 border-l-primary shadow-lg animate-in fade-in slide-in-from-bottom-4 duration-500'>
              <div className='flex items-start justify-between gap-4 mb-3'>
                <Label className='text-sm font-semibold text-primary'>
                  Your Professional Response
                </Label>
                <Button
                  variant='ghost'
                  size='sm'
                  onClick={handleCopy}
                  className='h-8 px-3 hover:bg-primary/10'
                >
                  {isCopied ? (
                    <>
                      <CheckCheck className='h-4 w-4 mr-1 text-primary' />
                      <span className='text-primary'>Copied</span>
                    </>
                  ) : (
                    <>
                      <Copy className='h-4 w-4 mr-1' />
                      Copy
                    </>
                  )}
                </Button>
              </div>
              <p className='text-card-foreground leading-relaxed text-pretty'>
                {response}
              </p>
            </Card>
          )}
        </div>
      </main>

      {/* Footer */}
      <footer className='border-t border-border mt-auto bg-muted/30'>
        <div className='container mx-auto px-4 py-6'>
          <p className='text-sm text-muted-foreground text-center'>
            Disclaimer: This tool is for entertainment purposes. Actual
            corporate communication may require additional synergy and
            leveraging of core competencies.
          </p>
        </div>
      </footer>
    </div>
  )
}
