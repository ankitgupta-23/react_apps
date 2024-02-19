import { useRef, useState } from 'react'
import './App.css'
import { useEffect } from 'react';


let GeneratePassword = (length=8, isSpecialChar=false, isDigit=false)=>{
  let charPool = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghikjlmnopqrstuvwxyz';
  if(isSpecialChar)
    charPool+='@!#$%^&*()_+{}|.?';

  if(isDigit)
    charPool+='123456789';

  let pw = '';
  charPool = [...charPool].sort(()=>Math.random()-.5).join('');
  
  for(let i=0; i<length; i++){
    pw+=charPool.charAt(Math.floor(Math.random()*charPool.length));
  }

  
  return pw;
}



function App() { 
 
  const [length, setLength] = useState(8);
  const [isSpecialChar, setSpecialChar] = useState(false);
  const [isDigit, setDigit] = useState(false);
  const [password, setPassword] = useState(GeneratePassword());
  const pw_field = useRef(null);

  const copyPassword = ()=>{
    pw_field.current.select();
    window.navigator.clipboard.writeText(password);
  }

  useEffect(()=>{
    setPassword(GeneratePassword(length, isSpecialChar, isDigit));
  }, [length, isSpecialChar, isDigit])

  return (


    <div className='bg-gray-900 h-screen flex justify-center item-center p-6'>
      <div 
      className='w-screen h-3/4 xl:w-6/12 lg:w-12/12 md:w-12/12 rounded-xl bg-slate-400  drop-shadow-lg border-slate-400
     '>
          <h1 className='mt-14 pt-5 text-3xl text-center'>Random Password Generator</h1>
          <div className='mt-10 p-6'>
            <input className='w-3/4 text-2xl p-1 pl-4 rounded-lg rounded-r-none' type="text" readOnly value={password} ref = {pw_field}/>
            <button className='w-1/4 p-1 text-2xl bg-green-300 shadow-xl hover:bg-red-400 hover:text-white rounded-r-lg' onClick={copyPassword}>Copy</button>

          </div>

          <div className='px-6'>
          <input type='range' min='6' max='25' name='length' id='length' className='w-full'
          onChange={(e)=>setLength(e.target.value)}
          value={length}
          />
           

          </div>
          <div className='mt-4 px-6 flex justify-around'>
            <div className='text-lg'>
              <label htmlFor='length'>Lenght: {length}</label>
            </div>
           
            <div className='text-lg'>
              <input type="checkbox" name='is_specChar' id='is_specChar' className='mx-1 w-4 h-4 p-0 cursor-pointer'
              onChange={()=>(setSpecialChar(!isSpecialChar))}
              />
              <label htmlFor='is_specChar'>Special Characters</label>
            </div>
            
            <div className='text-lg'>
              <input type="checkbox" name='is_digit' id='is_digit' className='mx-1 w-4 h-4 p-0 cursor-pointer'
              onChange={()=>(setDigit(!isDigit))}
              />
              <label htmlFor='is_digit'>Digits</label>
            </div>

          </div>
      </div>
    </div>

  )
}

export default App


