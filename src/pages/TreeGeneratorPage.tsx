import React, { FC, useState } from 'react'
import styled from 'styled-components'
import JSZip from 'jszip'
import { saveAs } from 'file-saver'
import logoUrl from '../assets/images/logo.png'
import { fnt } from '../theme/theme'

const Title = styled.h1`
  font-size: 4rem;
  font-weight: ${fnt.fontWeights.bold};
  color: ${fnt.colors.brown};
  line-height: 4rem;
  margin: 0;
`

const LogoImage = styled.img`
  width: 4rem;
  height: 4rem;
`

const TextArea = styled.textarea`
  border: ${fnt.colors.lightPink} solid 1rem;
  background-color: ${fnt.colors.white};
  width: 100%;
  height: 16rem;
  padding: 1rem;
  line-height: 1.5rem;
  font-family: 'Courier New', Courier, monospace;
  outline: 0;

  &:focus,
  &:active {
    border-color: ${fnt.colors.darkPink};
  }
`

const Button = styled.button`
  cursor: pointer;
  background-color: ${fnt.colors.green};
  padding: 1rem 2rem;
  width: 100%;
  border: 0;
  margin: 1rem 0 0 0;
  font-size: 2rem;
  font-weight: ${fnt.fontWeights.bold};
  border: transparent solid 1rem;
  transition: border ease-in-out .125s;
  outline: 0;

  &:focus,
  &:hover {
    border-color: ${fnt.colors.black};
  }
`

const example = [
  `${new Date().getFullYear() + 1}-planning`,
  `${new Date().getFullYear() + 1}-planning/january/monthly-notes.txt`,
  `${new Date().getFullYear() + 1}-planning/february/monthly-notes.txt`,
  `${new Date().getFullYear() + 1}-planning/march/monthly-notes.txt`,
  `${new Date().getFullYear() + 1}-planning/march/1st-quarter-notes.txt`,
]

export const TreeGeneratorPage: FC = () => {
  const [input, setInput] = useState(example.join('\n'))
  const dowloadClicked = async () => {
    const zip = new JSZip()
    input.split('\n').forEach(line => {
      if (line.match(/\.\w+$/)) {
        zip.file(line, '')
      } else {
        zip.folder(line)
      }
    })
    try {
      const contents = await zip.generateAsync({ type: 'blob' })
      saveAs(contents, 'tree.zip')
    } catch (error) {
      console.error(error)
      alert('An error occurred!')
    }
  }

  return (
    <>
      <Title>
        <LogoImage src={logoUrl} alt="Logo" /> Directory Tree Generator
      </Title>
      <p>Write down the desired directory tree structure then click generate.</p>
      <TextArea value={input} onChange={e => setInput(e.target.value)} />
      <Button onClick={dowloadClicked}>Download</Button>
    </>
  )
}