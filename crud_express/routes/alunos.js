var express = require('express');
var router = express.Router();
var alunoService = require("../services/professor.services")
var alunoServiceMongo = require("../services/aluno.services.mongo")


/*router.get(
    "/listar"
    ,
    (req, res, next) => {
        res.json(professorService.list())
    }
)
*/

router.get(
    "/listar"
    ,
    (request, response, next) => {
        alunoServiceMongo.list(request,response)
    }
)
router.get(
    "/ira"
    ,
    (request, response, next) => {
        alunoServiceMongo.list(request,response)
    }
)


/*router.post(
    "/register"
    ,
    (req, res, next) => {
        const professor = professorService.register(req.body)
        res.json(professor)
    }
)*/

router.post(
    "/register"
    ,
    (request, response, next) => {
        alunoServiceMongo.register(request,response)
    }
)

/*router.put(
    "/update/:id"
    ,
    (req, res, next) => {
        const professor = professorService.update(req.params.id, req.body)
        res.json(professor)
    }
)*/

router.put(
    "/update/:id"
    ,
    (request, response, next) => {
        alunoServiceMongo.update(request,response)
    }
)

/*router.delete("/delete/:id"
    ,
    function (req, res, next) {
        const ok = professorService.delete(req.params.id);
        if (ok) return res.json({ "sucess": true });
        else return res.json({ "sucess": false });
    }
)*/

router.delete("/delete/:id"
    ,
    function (request, response, next) {
        alunoServiceMongo.delete(request,response)
    }
)

/*router.get('/retrieve/:id', function (req, res, next) {
    const out = professorService.retrieve(req.params.id);
    return res.json(out);
});*/

router.get('/retrieve/:id', function (request, response, next) {
    alunoServiceMongo.retrieve(request,response)
});

module.exports = router;
