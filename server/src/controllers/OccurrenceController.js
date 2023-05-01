const Occurrences = require("../models/Occurrence")
const { body, param } = require("express-validator")
const { validationResult } = require("express-validator")

class OccurrenceController {
    static async index(req, res) {
        Occurrences.find({}).toArray(function(err, items) {
            if (err) {
              console.log(err);
              return res.status(500).json({ error: 'Erro ao buscar objetos no banco de dados' })
            }
            res.status(200).json(items)
        });
    }

    static async create(req, res) {
        const errors = validationResult(req);
        if (!errors.isEmpty()) {
            return res.status(400).json({
                message: errors.array()[0].msg,
            })
        }
        const id = (await Occurrences.countDocuments()) + 1
        const {registered_at, local, occurrence_type, km, user_id} = req.body
        
        let occurrence = new Occurrences({
            id: id,
            registered_at: registered_at, 
            local: local, 
            occurrence_type: occurrence_type, 
            km: km, 
            user_id: user_id
        })

        await occurrence.save()
        res.status(201).json({
            message: 'Ocorrência criada com sucesso.'
        })
    }

    static async read(req, res) {
        const { occurrenceId } = req.params
        const query = { id: occurrenceId }
        const occurrence = await Occurrences.findOne(query).exec()
        
        if(!occurrence) {
            return res.status(400).json({
                message: "Essas credenciais não correspondem aos nossos registros.."
            })
        }

        return res.status(200).send({
            id: id,
            registered_at: registered_at, 
            local: local, 
            occurrence_type: occurrence_type, 
            km: km, 
            user_id: user_id
        })
    }

    static async update(req, res) {
        const { occurrenceId } = req.params
        if(!occurrenceId) {
            return res.status(400).json({
                message: "Por favor, informe o ID da ocorrência."
            })
        }

        const errors = validationResult(req);
        if (!errors.isEmpty()) {
            return res.status(400).json({
                message: errors.array()[0].msg,
            })
        }

        const query = { id: occurrenceId }
        const {name, email, password} = req.body
        const occurrence = await Occurrences.findOneAndUpdate(query, { registered_at, local, occurrence_type, km, user_id }, { new: true })
        
        res.status(200).json({
            id: occurrence.id,
            registered_at: occurrence.registered_at, 
            local: occurrence.local, 
            occurrence_type: occurrence.occurrence_type, 
            km: occurrence.km, 
            user_id: occurrence.user_id
        })
    }

    static async delete(req, res) {
        const { occurrenceId } = req.params
        const query = { id: occurrenceId }
        await Occurrences.findOneAndDelete(query)
        res.status(200).json({
            message: 'Ocorrência deletada com sucesso.'
        })
    }

    static validate(method) {
        switch (method) {
            case 'create':
                return [ 
                    body('registered_at')
                        .exists().withMessage('A data é obrigatória.')
                        .isDate().withMessage('A data deve estar em um formato válido.'),
                    body('local')
                        .exists().withMessage('O local é obrigatório.'),
                    body('occurrence_type')
                        .exists().withMessage('O tipo de ocorrência é obrigatório.'),
                    body('km')
                        .exists().withMessage('O km é obrigatório.'),
                    body('user_id')
                        .exists().withMessage('O ID do usuário é obrigatório.'),

                ]   
            case 'read': 
                return [
                    param('occurrenceId')
                        .exists().withMessage('Informe o ID da ocorrência')
                ]
            case 'update':
                return [
                    body('registered_at')
                        .exists().withMessage('A data é obrigatória.')
                        .isDate().withMessage('A data deve estar em um formato válido.'),
                    body('local')
                        .exists().withMessage('O local é obrigatório.'),
                    body('occurrence_type')
                        .exists().withMessage('O tipo de ocorrência é obrigatório.'),
                    body('km')
                        .exists().withMessage('O km é obrigatório.'),
                    body('user_id')
                        .exists().withMessage('O ID do usuário é obrigatório.'),
                ]
            case 'delete': 
                return [
                    param('occurrenceId')
                        .exists().withMessage('Informe o ID da ocorrência')
                ]
        }
    }
}

module.exports = OccurrenceController