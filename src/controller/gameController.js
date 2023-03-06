const router = require('express').Router();
const gameService = require('../services/gameServices');

// const { isAuth } = require('../middlewares/authMiddleware');

router.get('/catalog', async (req, res) => {
    let games = await gameService.getAll();
    res.render('games/catalog', { games });
});

router.get('/create', (req, res) => {
    res.render('games/create')
});

router.post('/create', async (req, res) => {
    try {
        await gameService.create({ ...req.body, owner: req.user._id });
        res.redirect('/games/catalog');
    } catch (error) {
        console.log(error);
        res.render('games/create', { error: getErrorMessage(error) });
    }
});

function getErrorMessage(error) {
    let errorsArr = Object.keys(error.errors);

    if (errorsArr.length > 0) {
        return error.errors[errorsArr[0]];
    } else {
        return error.message
    }

}

router.get('/details/:gamesId', async (req, res) => {
    let game = await gameService.getOne(req.params.gamesId);

    let gameData = await game.toObject();

    let isOwner = gameData.owner == req.user?._id;
    let buyer = game.getBuyers();

    let isBought = req.user && buyer.some(c => c._id == req.user?._id);

    res.render('games/details', { ...gameData, isOwner, isBought });
});

// async function isOwner(req, res, next) {
//     let crypto = await cryptoService.getOne(req.params.cryptoId);

//     if (crypto.owner == req.user._id) {
//         res.redirect(`/crypto/${req.params.cryptoId}/details`);
//     } else {
//         next();
//     }
// }

// router.get('/:cryptoId/buy', isOwner, async (req, res) => {
//     let crypto = await cryptoService.getOne(req.params.cryptoId);

//     crypto.buyer.push(req.user._id);
//     await crypto.save();

//     res.redirect(`/crypto/${req.params.cryptoId}/details`);

// });

// async function checkIsOwner(req, res, next) {
//     let crypto = await cryptoService.getOne(req.params.cryptoId);

//     if (crypto.owner == req.user._id) {
//         next();
//     } else {
//         res.redirect(`/crypto/${req.params.cryptoId}/details`);
//     }
// }

// router.get('/:cryptoId/delete', checkIsOwner, async (req, res) => {
//     try {
//         await cryptoService.delete(req.params.cryptoId);

//         res.redirect('/crypto');
//     } catch (error) {
//         console.log(error);
//         res.render('crypto/create', { error: getErrorMessage(error) });
//     }

// });

// router.get('/:cryptoId/edit', checkIsOwner, async (req, res) => {
//     let crypto = await cryptoService.getOne(req.params.cryptoId);

//     res.render('crypto/edit', { ...crypto.toObject() });
// });

// router.post('/:cryptoId/edit', checkIsOwner, async (req, res) => {
//     try {
//         await cryptoService.updateOne(req.params.cryptoId, req.body);

//         res.redirect(`/crypto/${req.params.cryptoId}/details`);
//     } catch {
//         console.log(error);
//         res.render('crypto/create', { error: getErrorMessage(error) });
//     }

// });

module.exports = router;