

import { BrowserRouter, Routes, Route } from "react-router-dom"
import { Container } from "@mui/material"
import MyMenu from "./MyMenuV1"

import CadastrarProfessor from "./professor/Cadastrar"
import ListarProfessor from "./professor/Listar"
import EditarProfessor from "./professor/Editar"

import ListarAluno from "./aluno/Listar"

import CadastrarAluno from "./aluno/Cadastrar"

import EditarAluno from "./aluno/Editar"
import Ira from "./aluno/ListarIra"

const MainPage = () => {
    return (//nova rota "ira" que foi criada
        <BrowserRouter>
            <MyMenu />
            <Container sx={{mt:5,display:"flex",flexDirection:"column",alignItems:"center"}}>
                <Routes>
                    <Route path="cadastrarProfessor" element={<CadastrarProfessor/>}/>
                    <Route path="listarProfessor" element={<ListarProfessor/>}/>
                    <Route path="editarProfessor/:id" element={<EditarProfessor/>}/>
                    <Route path="/listarAluno" element={<ListarAluno/>}/>
                    <Route path="/cadastrarAluno" element={<CadastrarAluno/>}/>
                    <Route path="editarAluno/:id" element={<EditarAluno/>}/>
                    <Route path="ira" element={<Ira/>}/> 




                </Routes>
            </Container>
        </BrowserRouter>
    )
}

export default MainPage