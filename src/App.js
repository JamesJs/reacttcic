/* eslint-disable react-hooks/exhaustive-deps */
import React,{useState,useEffect,useRef} from 'react';
import Form from 'react-bootstrap/Form'
import Button from 'react-bootstrap/Button'
import Image from 'react-bootstrap/Image'
import './App.css';
import ufsj from './assets/UFSJ_logo_2018.jpg'
function App() {
  const [tipo,setTipo] = useState("TCC");
  const [mudaOrientador,setMuda] = useState(false);
  const [orientador,setOrientador] = useState('');
  const [cnpq,setCnpq] = useState('');
  const [campus,setCampus] = useState('');
  const [curso,setCurso] = useState('');
  const [ano,setAno] = useState(2009);
  const [assunto,setAssunto] = useState("");
  const [autor,setAutor] = useState('');
  const [artigos,setArtigos] = useState([]);
  const [cursos,setCursos] = useState([]);
  const [orientadores,setOrientadores] = useState([]);
  const [autores,setAutores] = useState([]);
  const [assuntos,setAssuntos] = useState([]);
  const [anos,setAnos] = useState([]);
  var didupdate = useRef(false);
  var campusUpdate = useRef(false);  
  var didupdate2 = useRef(false);
  var alteradoOrientador = useRef(false);
  var alteradoAssunto = useRef(false);
  var alteradoAutor = useRef(false);
  var alteradoano = useRef(false);
  const attOrientadores = (data) =>{
    var aux = [];
    var aux2 = 0;
    aux.push('');
    data.forEach((element,index)=>{ 
      if(element.orientador === orientador){
        aux2 = index;
      }
      aux.push(element.orientador)})
    setOrientadores(aux);
    setOrientador(data[aux2].orientador)
}
const attAutores = (data) =>{
  var aux = [];
  var aux2 = 0;
    aux.push('');
    data.forEach((element,index)=>{ 
      if(element.autor === autor){
        aux2 = index;
      }
      aux.push(element.autor)})
    setAutores(aux);
    setAutor(data[aux2].autor)
}
const attAssuntos = (data) =>{
  //console.log(data);
  console.log("Esse eo o assunto"+assunto);
  
  var aux = [];
  var aux2 = 0;
    aux.push('');
    data.forEach((element,index)=>{ 

      if(element.assunto === assunto){
        console.log("esta contido")
        aux2 = index;
      }
      aux.push(element.assunto)})
    setAssuntos(aux);
    console.log(aux2)
    setAssunto(data[aux2].assunto)
  
}
const attAnos = (data) =>{
  console.log(data);
  var aux = [];
  var aux2 = 0;
    aux.push('');
    data.forEach((element,index)=>{ 
      if(element.dataApresentacao === ano){
        aux2 = index;
      }
      aux.push(element.dataApresentacao)})
    setAnos(aux);
    
    setAno(data[aux2].ano)
}



  useEffect(()=>{

    if(campusUpdate.current===false){
      campusUpdate.current = true
    }else{
    const fetchcampos =async() =>{
      
      var data = await fetch(`https://cors-anywhere.herokuapp.com/http://victorandrade4-001-site1.itempurl.com/api/cursos/${campus}`)
      if(data.status===200){
        data = await data.json();
        console.log(data);
        setCursos(data);
        setCurso(data[0].nomeCurso)
        
      }else{
        setCursos([]);
      }
  
    }
    fetchcampos();
  }
  // eslint-disable-next-line react-hooks/exhaustive-deps
  },[campus])
  useEffect(()=>{

    if(didupdate2.current===false){
      didupdate2.current = true
    }else{
    const fetchcampos =async() =>{
      
      
      const dataSend={
        Autor : autor!=="" ?  autor: null, 
        Ano :ano!==""? ano : null, 
        Orientador : orientador!==""? orientador:null, 
        Assunto:assunto!==""? assunto : null,
        Cnpq :cnpq!==""? cnpq : null,
        Tipo :tipo!==""? tipo : null,
        CursoNome :curso!==""? curso : null

      }
      console.log(JSON.stringify(dataSend));
      const op={
        method:'POST',
        body:JSON.stringify(dataSend),
        headers: {
          'Content-Type': 'application/json',
        }
      }
      var data = await fetch(`https://cors-anywhere.herokuapp.com/http://victorandrade4-001-site1.itempurl.com/api/artigos/filtro`,op);
      if(data.status===200){
        data = await  data.json();
        
        if(alteradoano.current===true){
          alteradoano.current=false;
          attOrientadores(data)
          attAssuntos(data);
          attAutores(data);
        }if(alteradoAssunto.current===true){
          alteradoAssunto.current=false;
          attAnos(data);
          attOrientadores(data)
          attAutores(data);
        }if(alteradoOrientador.current===true){
          alteradoOrientador.current=false;
          attAnos(data);
          attAutores(data);
          attAssuntos(data);
        }if(alteradoAutor.current===true){
          alteradoAutor.current=false;
          attAnos(data);
          attAssuntos(data);
          attOrientadores(data)
          
        }

        setArtigos(data);
      }
      
      else{
        setArtigos([]);
        setOrientadores([]);
        setAutores([]);
        setAssuntos([])
      }
  
    }
    fetchcampos();
  }
  // eslint-disable-next-line react-hooks/exhaustive-deps
  },[ano, orientador, assunto, autor])
 
  useEffect(()=>{

    if(didupdate.current===false){
      didupdate.current = true
    }else{
    const fetchcampos =async() =>{
      
      
      const dataSend={
        campus: campus!==""? campus : null,
        Cnpq :cnpq!==""? cnpq : null,
        Tipo :tipo!==""? tipo : null,
        CursoNome :curso!==""? curso : null

      }
      console.log(JSON.stringify(dataSend));
      const op={
        method:'POST',
        body:JSON.stringify(dataSend),
        headers: {
          'Content-Type': 'application/json',
        }
      }
      var data = await fetch(`https://cors-anywhere.herokuapp.com/http://victorandrade4-001-site1.itempurl.com/api/artigos/filtro`,op);
      if(data.status===200){
        data = await  data.json();
        attAutores(data) 
        attAnos(data);
          attAssuntos(data);
          attOrientadores(data)
        setArtigos(data);
      }
      
      else{
        setArtigos([]);
        setOrientadores([]);
        setAutores([]);
        setAssuntos([])
      }
  
    }
    fetchcampos();
  }
  // eslint-disable-next-line react-hooks/exhaustive-deps
  },[campus, cnpq, tipo, curso])
  return (
    <html>
    <header>
      
    </header>
    
    <body>
    <div className="App">
    <div className="botao">
        <Button className="mb-2" size="sm" variant="primary">Acesso Autorizado</Button>
      </div>
      
      <div className="img">
        <Image className="imgUfsj" src={ufsj} alt="ufsj" thumbnail/>
        <div className="h1">
          <h1>Banco de monográfias</h1>
        </div>
      
      </div>
    <div className="inputs">
    <Form>
     
      <Form.Group controlId="exampleForm.SelectCustom">
    
        <div className="form">
          <div className="celulaForm">
            <Form.Label className="label">Tipo</Form.Label>
            <Form.Control value={tipo} onChange={(e)=>{setTipo(e.target.value)}} as="select" custom>
              <option>TCC</option>
            </Form.Control>
          </div>
          <div className="celulaForm">
            <Form.Label  className="label">CNPQ</Form.Label>
            <Form.Control onChange={(e)=>{console.log(e.target.value==='');setCnpq(e.target.value)}} value={cnpq} as="select" custom>
              <option className="input-sm">{''}</option>
              <option>2</option>
              <option>3</option>
              <option>4</option>
              <option>5</option>
            </Form.Control>
          </div>
          <div className="celulaForm">
            <Form.Label className="label">CAMPUS</Form.Label>
            <Form.Control value={campus} onChange={(e)=>{
              setCampus(e.target.value)
              }}  as="select" custom>
              <option className="input-sm"> </option>
              <option className="input-sm">Dom Bosco</option>
              <option>CTAN</option>
              <option>CSL</option>
              <option>CAP</option>
              <option>CSA</option>
            </Form.Control>
          </div>
          <div className="celulaForm">
            <Form.Label className="label">Curso</Form.Label>
            <Form.Control value={curso} onChange={(e)=>setCurso(e.target.value)} as="select" custom>    
              {
                
                cursos.map((index)=>
                  <option>{index.nomeCurso}</option>
                )
              }
            </Form.Control>
          </div>
    </div>
  </Form.Group>
  </Form>

<div>  
    <Form>
     
      <Form.Group controlId="exampleForm.SelectCustom">
    
        <div className="form">
          <div className="celulaForm">
            <Form.Label className="label">Ano</Form.Label>
            <Form.Control value={ano} onChange={(e)=>{alteradoano.current=true;setAno(e.target.value)}} as="select" custom>
            {
              anos.map((index)=>(
                  <option>{index}</option>
              ))}
            </Form.Control>
          </div>
          <div className="celulaForm">
            <Form.Label  className="label">Orientador</Form.Label>
            <Form.Control value={orientador} onChange={(e)=>{setOrientador(e.target.value)}} as="select" custom>
            {
              orientadores.map((index)=>(
                  <option>{index}</option>
              ))}
            </Form.Control>
          </div>
          <div className="celulaForm">
            <Form.Label  className="label">Assunto</Form.Label>
            <Form.Control onChange={(e)=>{setAssunto(e.target.value)}} value={assunto} as="select" custom>
            {
              assuntos.map((index)=>(
                  <option>{index}</option>
              ))}
            </Form.Control>
          </div>
          <div className="celulaForm">
            <Form.Label className="label">Autor</Form.Label>
            <Form.Control onChange={(e)=>{alteradoAutor.current = true; setAutor(e.target.value)}} value={autor}  as="select" custom>
            {
              autores.map((index)=>(
                  <option>{index}</option>
              ))}
            </Form.Control>
          </div>
    </div>
  </Form.Group>
  </Form>
</div>
</div>
  {artigos.map((index)=>(
    <div className="resul">
  
 
    <p>Curso:</p>
      <p> Campus:{index.curso.campus}</p>
      <p> Departamento:{index.curso.departamento}</p>
      <p> Nome do curso:{index.curso.nomeCurso}</p>
    
    <p>Título:{index.titulo}</p>

    <p>Tipo:{index.tipo}</p>
    <p className="abstract">Abstract:{index.abstract}</p>
    <p>Referências:{index.referencias}</p>
    <p>Data:{index.dataApresentacao}</p>
    <p>Assunto:{index.assunto}</p>
    <p>Author:{index.autor}</p>
    <p>Lattes:{index.autorLinkLattes}</p>
    <p>Orientador:{index.orientador}</p>
    <p>Lattes Orientados:{index.orientadorLinkLattes}</p>
    <p>Co-Orientador:{index.orientador}</p>
    <p>Lattes Co-Orientados:{index.coOrientadorLinkLattes}</p>
    <p>CNPQ:{index.cnpq}</p>
    <p>Referências:</p>
    
    
</div>
  ))
    
  }
    </div>
    </body>
    </html>
  );
}

export default App;
