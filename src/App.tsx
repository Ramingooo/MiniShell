import React, { useState, useEffect, useRef } from 'react';
import { Terminal, X } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';

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

const INITIAL_FS: any = {
  '~': {
    'src/': {
      'main.c': '#include <unistd.h>\n\nint main() {\n    write(1, "Hello World\\n", 12);\n    return 0;\n}',
      'utils.c': '// Utility functions'
    },
    'include/': {
      'minishell.h': '#ifndef MINISHELL_H\n#define MINISHELL_H\n...'
    },
    'obj/': {},
    'Makefile': 'CC=gcc\nall: minishell\n...',
    'README.md': '# Minishell Project\nPure C implementation.'
  }
};

export default function App() {
  const [history, setHistory] = useState<any[]>([
    { type: 'output', content: 'RAMINGOOO_SHELL v1.3.1' },
    { type: 'output', content: 'Ready for input. Type "help" to start.' },
  ]);
  const [input, setInput] = useState('');
  const [currentPath, setCurrentPath] = useState('~');
  const [fs, setFs] = useState(INITIAL_FS);
  const [editor, setEditor] = useState<{file: string, content: string} | null>(null);
  const terminalEndRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    terminalEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [history]);

  const getDir = (path: string) => {
    let curr = fs;
    const parts = path.split('/').filter(p => p && p !== '~');
    for (const p of parts) {
      const key = p.endsWith('/') ? p : p + '/';
      curr = curr[key] || curr['~']?.[key];
      if (!curr) return null;
    }
    return path === '~' ? fs['~'] : curr;
  };

  const handleCommand = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter') {
      const newHistory = [...history, { type: 'input', content: input, path: currentPath }];
      const args = input.trim().split(/\s+/);
      const cmd = args[0].toLowerCase();
      const dir = getDir(currentPath);

      if (cmd === 'help') {
        newHistory.push({ type: 'output', content: 'Commands: ls, cd, vim, gcc, ./executable, clear, pwd, whoami, exit' });
      } else if (cmd === 'ls') {
        const contents = Object.keys(dir || {}).join('  ');
        newHistory.push({ type: 'output', content: contents || '(empty)' });
      } else if (cmd === 'cd') {
        const target = args[1];
        if (!target || target === '~') {
          setCurrentPath('~');
        } else {
          const targetKey = target.endsWith('/') ? target : target + '/';
          if (dir[targetKey]) {
            setCurrentPath(currentPath === '~' ? `~/${target}` : `${currentPath}/${target}`);
          } else {
            newHistory.push({ type: 'output', content: `cd: no such directory: ${target}` });
          }
        }
      } else if (cmd === 'vim') {
        const file = args[1];
        if (dir && dir[file] !== undefined && !file.endsWith('/')) {
          setEditor({ file, content: dir[file] });
          setInput('');
          return;
        } else {
          newHistory.push({ type: 'output', content: `vim: cannot open: ${file || 'no file specified'}` });
        }
      } else if (cmd === 'gcc') {
        const file = args[1];
        if (file && file.endsWith('.c') && dir[file]) {
          newHistory.push({ type: 'output', content: `Compiling ${file}...` });
          setTimeout(() => {
            setHistory(prev => [...prev, { type: 'output', content: 'Linking objects...' }]);
            setTimeout(() => {
              const newFs = JSON.parse(JSON.stringify(fs));
              const parts = currentPath.split('/').filter(p => p && p !== '~');
              let targetDir = newFs['~'];
              for (const p of parts) {
                const key = p.endsWith('/') ? p : p + '/';
                targetDir = targetDir[key];
              }
              targetDir['a.out'] = '[binary data]';
              setFs(newFs);
              setHistory(prev => [...prev, { type: 'output', content: 'Build successful: ./a.out created.' }]);
            }, 800);
          }, 1000);
        } else {
          newHistory.push({ type: 'output', content: 'gcc: fatal error: no input files' });
        }
      } else if (cmd.startsWith('./')) {
        const exec = cmd.substring(2);
        if (dir && dir[exec]) {
          if (exec === 'a.out') {
            newHistory.push({ type: 'output', content: 'Hello World' });
          } else if (exec === 'minishell') {
            newHistory.push({ type: 'output', content: 'Recursive shell starting...' });
          } else {
            newHistory.push({ type: 'output', content: `minishell: permission denied: ./${exec}` });
          }
        } else {
          newHistory.push({ type: 'output', content: `minishell: no such file or directory: ${cmd}` });
        }
      } else if (cmd === 'clear') {
        setHistory([]); setInput(''); return;
      } else if (cmd === 'pwd') {
        newHistory.push({ type: 'output', content: currentPath.replace('~', '/home/ramingooo') });
      } else if (cmd === 'whoami') {
        newHistory.push({ type: 'output', content: 'ramingooo' });
      } else if (cmd === 'exit') {
        newHistory.push({ type: 'output', content: 'Connection lost.' });
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
        className='w-full max-w-4xl bg-[#0D0208]/90 border border-[#00ff41]/30 rounded-lg shadow-[0_0_50px_rgba(0,255,65,0.2)] z-10 overflow-hidden flex flex-col relative'
        style={{ height: '75vh' }}
      >
        <div className='bg-[#003b00]/40 px-4 py-2 border-b border-[#00ff41]/20 flex items-center justify-between'>
          <div className='flex items-center gap-2'>
            <Terminal className='w-4 h-4' />
            <span className='text-xs font-bold tracking-widest uppercase text-[#00ff41]'>ramingooo@shell:{currentPath}</span>
          </div>
        </div>

        <div className='flex-1 overflow-y-auto p-6 text-sm leading-relaxed scrollbar-thin'>
          {history.map((item, i) => (
            <div key={i} className='mb-1'>
              {item.type === 'input' ? (
                <div className='flex gap-2'><span className='opacity-60'>ramingooo@shell:{item.path}$</span><span>{item.content}</span></div>
              ) : <div className='whitespace-pre-wrap'>{item.content}</div>}
            </div>
          ))}
          <div className='flex gap-2 items-center mt-2'>
            <span className='opacity-60'>ramingooo@shell:{currentPath}$</span>
            <input autoFocus className='flex-1 bg-transparent outline-none border-none text-[#00ff41]' value={input} onChange={e => setInput(e.target.value)} onKeyDown={handleCommand} autoComplete='off' />
          </div>
          <div ref={terminalEndRef} />
        </div>

        <AnimatePresence>
          {editor && (
            <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} className='absolute inset-0 bg-[#0D0208] z-20 flex flex-col'>
              <div className='bg-zinc-900 px-4 py-1 text-xs flex justify-between items-center text-zinc-400'>
                <span>VIM - {editor.file}</span>
                <button onClick={() => setEditor(null)}><X size={14} /></button>
              </div>
              <div className='flex-1 p-4 text-[#00ff41] overflow-hidden'>
                <div className='flex gap-4 h-full'>
                  <div className='opacity-30 text-right select-none font-mono'>{Array(20).fill(0).map((_, i) => <div key={i}>{i+1}</div>)}</div>
                  <textarea className='flex-1 bg-transparent border-none outline-none resize-none font-mono text-[#00ff41]' defaultValue={editor.content} spellCheck={false} autoFocus />
                </div>
              </div>
              <div className='bg-[#00ff41] text-[#0D0208] px-4 py-0.5 text-[10px] font-bold uppercase'>-- INSERT --</div>
            </motion.div>
          )}
        </AnimatePresence>
      </motion.div>

      <div className='mt-8 flex gap-8 z-10 text-[10px] uppercase tracking-[0.2em] font-bold'>
         <a href='https://github.com/Ramingooo' target='_blank' className='hover:text-white transition-colors text-[#00ff41]'>Github</a>
         <a href='https://Ramingooo.github.io/Portfolio' className='hover:text-white transition-colors text-[#00ff41]'>Portfolio</a>
      </div>
    </div>
  );
}
