
const BANCO_DE_DADOS_CACHE = new Map();

exports.get = (req, res) => {
    console.log("Listando todos");

    res.status(200).send({
        mensagem: "Listando todos",
        data: Array.from(BANCO_DE_DADOS_CACHE.values())
    });
};

exports.getById = (req, res) => {
    console.log("Recebendo os seguintes parametros:", req.params);
    const resultado = BANCO_DE_DADOS_CACHE.get(+req.params.id);

    if (!resultado) {
        res.status(404).send({
            mensagem: `O registro: [${req.params.id}], não foi encontrado`
        });
        return;
    }

    res.status(200).send(resultado);
};

exports.post = (req, res) => {
    console.log("Recebendo o conteúdo:", req.body);

    BANCO_DE_DADOS_CACHE.set(+req.body.id, req.body);

    res.status(201).send({
        mensagem: `Pessoa [${req.body.nome}] cadastrado com sucesso!`,
        data: req.body
    });
};

exports.put = (req, res) => {
    const id = req.params.id;
    const { body } = req;

    const encontrado = BANCO_DE_DADOS_CACHE.get(+id);

    if (!encontrado) {
        res.status(404).send({
            mensagem: `O registro: [${req.params.id}], não foi encontrado`
        });
        return;
    }

    BANCO_DE_DADOS_CACHE.set(+id, {
        ...encontrado,
        ...body
    });

    res.status(201).send({
        mensagem: `Pessoa [${req.body.nome}] atualizado com sucesso!`,
        data: req.body
    });
};

exports.delete = (req, res) => {
    const id = req.params.id;
    const encontrado = BANCO_DE_DADOS_CACHE.get(+id);

    if (!encontrado) {
        res.status(404).send({
            mensagem: `O registro: [${req.params.id}], não foi encontrado`
        });
        return;
    }

    BANCO_DE_DADOS_CACHE.delete(+id);

    res.status(200).send({
        mensagem: `Pessoa [${encontrado.nome}] deletado com sucesso!`,
    });
};