const md5 = require('js-md5');

class StoriesController {
    constructor(data) {
        this.data = data;
    }

    getSignUpForm(req, res) {
        return res.render('auth/sign-up', { title: 'Sign Up' });
    }
    getSignInForm(req, res) {
        return res.render('auth/sign-in', { title: 'Sign In' });
    }
    getWelcomeScreen(req, res) {
        return res.redirect('/');
    }
    signOut(req, res) {
        req.logout();
        return res.redirect('/');
    }
    signUp(req, res) {
        const bodyUser = req.body;
        bodyUser.password = md5(req.body.password);

        req.body.hasAvatar = false;

        this.data.users.findByUsername(bodyUser.username)
            .then((dbUser) => {
                if (dbUser) {
                    throw new Error('ima takuv user');
                }

                if (!bodyUser.bio) {
                    bodyUser.bio = 'A traveller from a distant land.';
                }

                return this.data.users.create(bodyUser);
            })
            .catch((err) => {
                return err;
            })
            .then(() => {
                return res.render('auth/sign-up');
            });
    }
}

const init = (data) => {
    return new StoriesController(data);
};

module.exports = { init };
