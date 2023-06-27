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
//calculo a media do ira
  const calcularMediaIRA = () => {
    let somaIRA = 0;
    alunos.forEach((aluno) => {
      somaIRA += aluno.ira;
    });
    return somaIRA / alunos.length;
  };
// coloco a media numa variável
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

  const alunosAcimaMedia = alunos.filter((aluno) => aluno.ira > mediaIRA);
//página que lista os alunos com maiores iras a partir da media
  return (
    <>
      <Typography variant="h5" fontWeight="bold">
        Listar Alunos com Grandes Iras
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
            {alunosAcimaMedia.map((aluno) => (
              <StyledTableRow key={aluno._id}>
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
            ))}
          </TableBody>
        </Table>
      </TableContainer>
    </>
  );
};
//stillização
const StyledTableCell = styled(TableCell)(({ theme }) => ({
  [`&.${tableCellClasses.head}`]: {
    backgroundColor: theme.palette.common.black,
    color: theme.palette.common.white,
  },
  [`&.${tableCellClasses.body}`]: {
    fontSize: 14,
  },
}));
//stilização
const StyledTableRow = styled(TableRow)(({ theme }) => ({
  '&:nth-of-type(odd)': {
    backgroundColor: theme.palette.action.hover,
  },
  '&:last-child td, &:last-child th': {
    border: 0,
  },
}));

export default Listar;
