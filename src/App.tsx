import React, { useState, useEffect, useRef } from 'react';
import { Terminal, Github, Home } from 'lucide-react';
import { motion } from 'framer-motion';

const MatrixRain = () => {
  return (
    <div className='fixed top-0 left-0 w-full h-full pointer-events-none opacity-10 overflow-hidden z-0'>
      <div className='absolute inset-0 bg-gradient-to-b from-transparent to-[#0D0208]' />
      <div className='matrix-column-container flex justify-between px-2 font-mono text-[#00ff41]'>
        {Array(20).fill(0).map((_, i) => (
          <div key={i} className='animate-matrix-rain whitespace-pre' style={{ animationDelay: `${Math.random() * 5}s` }}>
            {Array(10).fill(0).map(() => String.fromCharCode(0x30A0 + Math.random() * 96)).join('\n')}
          </div>
        ))}
      </div>
    </div>
  );
};

export default function App() {
  const [history, setHistory] = useState([
    { type: 'output', content: 'Minishell v1.0.0 (Matrix Edition)' },
    { type: 'output', content: 'Type "help" to see available commands.' },
  ]);
  const [input, setInput] = useState('');
  const terminalEndRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    terminalEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [history]);

  const handleCommand = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter') {
      const newHistory = [...history, { type: 'input', content: input }];
      const cmd = input.trim().toLowerCase();

      if (cmd === 'help') {
        newHistory.push({ type: 'output', content: 'Available commands: help, clear, ls, whoami, pwd, exit, matrix' });
      } else if (cmd === 'clear') {
        setHistory([]);
        setInput('');
        return;
      } else if (cmd === 'ls') {
        newHistory.push({ type: 'output', content: 'src/  include/  obj/  Makefile  minishell  README.md' });
      } else if (cmd === 'whoami') {
        newHistory.push({ type: 'output', content: 'neo@matrix' });
      } else if (cmd === 'pwd') {
        newHistory.push({ type: 'output', content: '/home/neo/projects/minishell' });
      } else if (cmd === 'matrix') {
        newHistory.push({ type: 'output', content: 'Follow the white rabbit...' });
      } else if (cmd === 'exit') {
        newHistory.push({ type: 'output', content: 'Goodbye, Neo.' });
      } else if (cmd !== '') {
        newHistory.push({ type: 'output', content: `minishell: command not found: ${cmd}` });
      }

      setHistory(newHistory);
      setInput('');
    }
  };

  return (
    <div className='min-h-screen bg-[#0D0208] text-[#00ff41] font-mono p-4 md:p-10 flex flex-col items-center justify-center relative overflow-hidden'>
      <MatrixRain />
      <motion.div 
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className='w-full max-w-4xl bg-[#0D0208]/80 border border-[#00ff41]/30 rounded-lg shadow-[0_0_50px_rgba(0,255,65,0.15)] z-10 overflow-hidden flex flex-col'
        style={{ height: '70vh' }}
      >
        <div className='bg-[#003b00]/40 px-4 py-2 border-b border-[#00ff41]/20 flex items-center justify-between'>
          <div className='flex items-center gap-2'>
            <Terminal className='w-4 h-4' />
            <span className='text-xs font-bold tracking-widest'>MINISHELL_OS v1.0</span>
          </div>
          <div className='flex gap-1.5'>
            <div className='w-3 h-3 rounded-full bg-[#003b00]' />
            <div className='w-3 h-3 rounded-full bg-[#00ff41]/30' />
            <div className='w-3 h-3 rounded-full bg-[#00ff41]' />
          </div>
        </div>
        <div className='flex-1 overflow-y-auto p-6'>
          <div className='space-y-2'>
            {history.map((item, i) => (
              <div key={i} className='break-all'>
                {item.type === 'input' ? (
                  <div className='flex items-center gap-2'>
                    <span className='opacity-70'>neo@matrix:~$</span>
                    <span>{item.content}</span>
                  </div>
                ) : (
                  <div className='font-bold opacity-90 leading-relaxed'>
                    {item.content}
                  </div>
                )}
              </div>
            ))}
          </div>
          <div className='flex items-center gap-2 mt-2'>
            <span className='opacity-70 whitespace-nowrap'>neo@matrix:~$</span>
            <input
              autoFocus
              className='flex-1 bg-transparent border-none outline-none text-[#00ff41] caret-[#00ff41] p-0 m-0'
              value={input}
              onChange={(e) => setInput(e.target.value)}
              onKeyDown={handleCommand}
              autoComplete='off'
            />
          </div>
          <div ref={terminalEndRef} />
        </div>
      </motion.div>
      <div className='mt-8 flex gap-6 z-10'>
         <a href='#' className='flex items-center gap-2 text-xs hover:text-white transition-colors border-b border-[#00ff41]/20 pb-1'>
           <Github className='w-4 h-4' /> Source Code
         </a>
         <a href='#' className='flex items-center gap-2 text-xs hover:text-white transition-colors border-b border-[#00ff41]/20 pb-1'>
           <Home className='w-4 h-4' /> Back to Portfolio
         </a>
      </div>
    </div>
  );
}
