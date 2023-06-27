import { TableContainer, Typography, Table, Paper, TableHead, TableBody, TableRow, TableCell, Box } from "@mui/material";
import IconButton from "@mui/material/IconButton";
import DeleteIcon from "@mui/icons-material/Delete";
import EditIcon from "@mui/icons-material/Edit";
import { styled } from '@mui/material/styles';
import { tableCellClasses } from '@mui/material/TableCell';
import { Link } from "react-router-dom";
import { useEffect, useState } from "react";
import axios from "axios";

const Listar = () => {
  const [alunos, setAlunos] = useState([]);
  let contador = 1;

  useEffect(() => {
    axios.get("http://localhost:3001/aluno/listar")
      .then((response) => {
        setAlunos(response.data);
      })
      .catch(error => console.log(error));
  }, []);

//capturar o ira de cada aluno, somar e depois dividir pela quantidade de alunos
  const calcularMediaIRA = () => {
    let somaIRA = 0;
    alunos.forEach((aluno) => {
      somaIRA += aluno.ira;
    });
    return somaIRA / alunos.length;
  };

//Criar variável que recebe a meida

  let mediaIRA = calcularMediaIRA();

  function deleteAlunoById(id) {
    if (window.confirm("Deseja Excluir ? " + id)) {
      axios.delete(`http://localhost:3001/aluno/delete/${id}`)
        .then((response) => {
          const resultado = alunos.filter(alun => alun._id !== id);
          setAlunos(resultado);
        })
        .catch(error => console.log(error));
    }
  }

  return (
    <>
      <Typography variant="h5" fontWeight="bold">
        Listar Aluno
      </Typography>
      <TableContainer component={Paper} sx={{ mt: 4, mb: 4 }}>
        <Table sx={{ minWidth: 650 }} aria-label="simple table">
          <TableHead>
            <TableRow>
              <StyledTableCell align="center">ID</StyledTableCell>
              <StyledTableCell>NOME</StyledTableCell>
              <StyledTableCell>CURSO</StyledTableCell>
              <StyledTableCell>IRA</StyledTableCell>
              <StyledTableCell>AÇÕES</StyledTableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {alunos.map((aluno) => {
              const menorqMedia = aluno.ira < mediaIRA;
              return (
                //comparo se o IRA do aluno está menor que a media, caso esteja estilizo ele com um css
                <StyledTableRow key={aluno._id} className={menorqMedia ? "menorqMedia" : ""}>
                  <StyledTableCell>{contador++}</StyledTableCell>
                  <StyledTableCell>{aluno.nome}</StyledTableCell>
                  <StyledTableCell>{aluno.curso}</StyledTableCell>
                  <StyledTableCell>{aluno.ira}</StyledTableCell>

                  <StyledTableCell>
                    <Box>
                      <IconButton aria-label="edit" color="primary" component={Link} to={`/editarAluno/${aluno._id}`}>
                        <EditIcon />
                      </IconButton>
                      <IconButton aria-label="delete" color="error" onClick={() => deleteAlunoById(aluno._id)}>
                        <DeleteIcon />
                      </IconButton>
                    </Box>
                  </StyledTableCell>
                </StyledTableRow>
              );//aqui está a linha da média geral, uso o toFixed para ter duas casas decimais após o ponto decimal.
            })}
            <StyledTableRow>
              <StyledTableCell></StyledTableCell>
              <StyledTableCell></StyledTableCell>
              <StyledTableCell></StyledTableCell>
              <StyledTableCell>
                
                <Typography variant="h6" fontWeight="bold" color="primary">
                  Média Geral: 
                </Typography>
              </StyledTableCell>
              <StyledTableCell>
                <Typography variant="h6" fontWeight="bold" color="primary">
                  
                  {mediaIRA.toFixed(2)}
                </Typography>
              </StyledTableCell>
            </StyledTableRow>
          </TableBody>
        </Table>
      </TableContainer>
    </>
  );
};

//cod usado para estilizar a tabela
const StyledTableCell = styled(TableCell)(({ theme }) => ({
  [`&.${tableCellClasses.head}`]: {
    backgroundColor: theme.palette.common.black,
    color: theme.palette.common.white,
  },
  [`&.${tableCellClasses.body}`]: {
    fontSize: 14,
  },
}));

const StyledTableRow = styled(TableRow)(({ theme }) => ({
  '&:nth-of-type(odd)': {
    backgroundColor: theme.palette.action.hover,
  },
  '&.below-average-row': {
    backgroundColor: '#ffcccc',
  },
  '&:last-child td, &:last-child th': {
    border: 0,
  },
}));

export default Listar;
