import React from 'react'
import { Download } from 'lucide-react'
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from '@/components/ui/dialog'
import { Button } from '@/components/ui/button'


export default function ResumeModal() {
  return (
    <Dialog
    >
      <DialogTrigger asChild>
        <Button variant="outline"
          className="w-[200px] h-[45px] px-3 py-5 rounded-full leading-4 tracking-tighter shadow-lg flex items-center justify-center gap-10 text-base md:text-lg text-[var(--ctaText)] bg-[var(--cta)] border border-[var(--primary)] hover:bg-inherit hover:text-[var(--cta)] hover:border hover:border-[var(--cta)]"
        >Hire me</Button>
      </DialogTrigger>
      <DialogContent className="max-w-3xl md:max-w-5xl bg-bg">
        <DialogHeader>
          <DialogTitle className="text-2xl font-bold text-center text-textColor">
            My Resume
          </DialogTitle>
        </DialogHeader>
        <div className="flex flex-col gap-4">
          <div className="h-[700px] w-full overflow-hidden rounded-lg border border-border">
            <iframe
              src="https://docs.google.com/document/d/1LBdENWcDAmdAgUdT1SfbAV5SiJ8VtM54NNn6LdIbowE/preview"
              className="h-full w-full"
              title="Resume Preview"
              frameBorder="0"
            ></iframe>
          </div>
          <a
            href="https://docs.google.com/document/d/1LBdENWcDAmdAgUdT1SfbAV5SiJ8VtM54NNn6LdIbowE/export?format=pdf"
            rel="noopener noreferrer"
            className="flex w-fit items-center gap-2 rounded-full bg-cta px-4 py-2 transition-colors duration-300 ease-in-out text-ctaText"
          >
            <Download className="h-4 w-4" /> Download PDF
          </a>
        </div>
      </DialogContent>
    </Dialog>
  )
}
