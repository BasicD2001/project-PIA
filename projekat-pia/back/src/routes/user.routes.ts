import express from 'express'
import { UserController } from '../kontrollers/user.controller';
import multer from 'multer';
import path from 'path';
const userRouter = express.Router();


const storage = multer.diskStorage({
    destination: (req: express.Request, file: Express.Multer.File, cb: (error: Error | null, destination: string) => void) => {
        cb(null, 'uploads/'); 
    },
    filename: (req: express.Request, file: Express.Multer.File, cb: (error: Error | null, destination: string) => void) => {
        const korisnicko_ime = req.body.korisnicko_ime;
        const originalName = file.originalname;
        console.log('File object:', file);
        const ext = path.extname(file.originalname);  
        console.log('Ekstenzija fajla:', ext);

       
        if (ext === '.png' || ext === '.jpeg' || ext === '.jpg') {
            cb(null, originalName);  
        } else {
            cb(new Error('Fajl nema odgovarajuću ekstenziju'), korisnicko_ime + '.unknown');  
        }
    }
});

const fileFilter = (req: express.Request, file: Express.Multer.File, cb: multer.FileFilterCallback) => {
    if (file.mimetype === 'image/jpeg' || file.mimetype === 'image/png') {
        cb(null, true);
    } else {
        cb(null, false);
    }
};

const upload = multer({
    storage: storage,
    fileFilter: fileFilter,
    limits: { fileSize: 1024 * 1024 * 3 }  // Limit 3MB
});










const storageJson = multer.diskStorage({
    destination: (req: express.Request, file: Express.Multer.File, cb: (error: Error | null, destination: string) => void) => {
        cb(null, 'uploads/'); 
    },
    filename: (req: express.Request, file: Express.Multer.File, cb: (error: Error | null, filename: string) => void) => {
        const originalName = file.originalname;
        const ext = path.extname(originalName);

        
        if (ext === '.json') {
            cb(null, originalName); 
        } else {
            cb(new Error('Fajl nije u JSON formatu'),'greska');
        }
    }
});


const jsonFileFilter = (req: express.Request, file: Express.Multer.File, cb: multer.FileFilterCallback) => {
    if (file.mimetype === 'application/json') {
        cb(null, true);
    } else {
        cb(null, false);
    }
};


const uploadJson = multer({
    storage: storageJson,
    fileFilter: jsonFileFilter,
    limits: { fileSize: 1024 * 1024 * 5 } // Limit 5MB
});







userRouter.post('/sacuvajIzgledBaste', uploadJson.single('json'), (req: express.Request, res: express.Response) => {
    new UserController().sacuvajIzgledBaste(req, res);
});









userRouter.route('/loginVlasnik').post(
    (req, res) => new UserController().loginVlasnik(req, res)
)

userRouter.route('/loginDekorater').post(
    (req, res) => new UserController().loginDekorater(req, res)
)

userRouter.post('/saveVlasnik', upload.single('slika'), (req: express.Request, res: express.Response) => {
    new UserController().saveVlasnik(req, res);
});

userRouter.post('/dodajSlikuBaste', upload.single('slika'), (req: express.Request, res: express.Response) => {
    new UserController().dodajSlikuBaste(req, res);
});


userRouter.post('/saveDekorater', upload.single('slika'), (req: express.Request, res: express.Response) => {
    new UserController().saveDekorater(req, res);
});


userRouter.post('/promeniSliku', upload.single('slika'), (req: express.Request, res: express.Response) => {
    new UserController().promeniSliku(req, res);
});

userRouter.post('/promeniSliku2', upload.single('slika'), (req: express.Request, res: express.Response) => {
    new UserController().promeniSliku2(req, res);
});

userRouter.route('/promeniIme').post(
    (req, res) => new UserController().promeniIme(req, res)
)

userRouter.route('/promeniIme2').post(
    (req, res) => new UserController().promeniIme2(req, res)
)


userRouter.route('/promeniPrezime').post(
    (req, res) => new UserController().promeniPrezime(req, res)
)

userRouter.route('/promeniPrezime2').post(
    (req, res) => new UserController().promeniPrezime2(req, res)
)

userRouter.route('/promeniMejl').post(
    (req, res) => new UserController().promeniMejl(req, res)
)

userRouter.route('/promeniMejl2').post(
    (req, res) => new UserController().promeniMejl2(req, res)
)

userRouter.route('/promeniKarticu').post(
    (req, res) => new UserController().promeniKarticu(req, res)
)

userRouter.route('/promeniKarticu2').post(
    (req, res) => new UserController().promeniKarticu2(req, res)
)

userRouter.route('/promeniBroj').post(
    (req, res) => new UserController().promeniBroj(req, res)
)

userRouter.route('/promeniBroj2').post(
    (req, res) => new UserController().promeniBroj2(req, res)
)

userRouter.route('/changePassword').post(
    (req, res) => new UserController().changePassword(req, res)
)

userRouter.route('/getEmails').post(
    (req, res) => new UserController().getEmails(req, res)
)

userRouter.route('/getUsers').post(
    (req, res) => new UserController().getUsers(req, res)
)

userRouter.route('/getVlasnik').post(
    (req, res) => new UserController().getVlasnik(req, res)
)

userRouter.route('/getDekorater').post(
    (req, res) => new UserController().getDekorater(req, res)
)

userRouter.route('/loginAdministrator').post(
    (req, res) => new UserController().loginAdministrator(req, res)
)

userRouter.route('/zahteviObrada').post(
    (req, res) => new UserController().zahteviObrada(req, res)
)

userRouter.route('/prihvatiZahtev').post(
    (req, res) => new UserController().prihvatiZahtev(req, res)
)

userRouter.route('/odbijZahtev').post(
    (req, res) => new UserController().odbijZahtev(req, res)
)

userRouter.route('/saveFirma').post(
    (req, res) => new UserController().saveFirma(req, res)
)

userRouter.route('/imenaFirmi').post(
    (req, res) => new UserController().imenaFirmi(req, res)
)

userRouter.route('/dohvatiVlasnike').post(
    (req, res) => new UserController().dohvatiVlasnike(req, res)
)

userRouter.route('/dohvatiDekoratere').post(
    (req, res) => new UserController().dohvatiDekoratere(req, res)
)

userRouter.route('/promeniStatus').post(
    (req, res) => new UserController().promeniStatus(req, res)
)

userRouter.route('/promeniStatus2').post(
    (req, res) => new UserController().promeniStatus2(req, res)
)

userRouter.route('/dohvatiFirme').post(
    (req, res) => new UserController().dohvatiFirme(req, res)
)

userRouter.route('/getFirma').post(
    (req, res) => new UserController().getFirma(req, res)
)

userRouter.route('/savePosao').post(
    (req, res) => new UserController().savePosao(req, res)
)



userRouter.route('/PosaoAktuelno').post(
    (req, res) => new UserController().PosaoAktuelno(req, res)
)

userRouter.route('/PosaoZavrseno').post(
    (req, res) => new UserController().PosaoZavrseno(req, res)
)

userRouter.route('/getPosao').post(
    (req, res) => new UserController().getPosao(req, res)
)

userRouter.route('/azurirajKomentar').post(
    (req, res) => new UserController().azurirajKomentar(req, res)
)


userRouter.route('/azurirajOcenu').post(
    (req, res) => new UserController().azurirajOcenu(req, res)
)


userRouter.route('/deletePosao').post(
    (req, res) => new UserController().deletePosao(req, res)
)

userRouter.route('/posaoZahtev').post(
    (req, res) => new UserController().posaoZahtev(req, res)
)


userRouter.route('/odrzavanje').post(
    (req, res) => new UserController().odrzavanje(req, res)
)


userRouter.route('/changeOdrzavanje').post(
    (req, res) => new UserController().changeOdrzavanje(req, res)
)


userRouter.route('/saveOdrzavanje').post(
    (req, res) => new UserController().saveOdrzavanje(req, res)
)

userRouter.route('/PosaoZavrsenOdrzavanje').post(
    (req, res) => new UserController().PosaoZavrsenOdrzavanje(req, res)
)

userRouter.route('/getOdrzavanja').post(
    (req, res) => new UserController().getOdrzavanja(req, res)
)



userRouter.route('/dekoraterPrihvatiZahtev').post(
    (req, res) => new UserController().dekoraterPrihvatiZahtev(req, res)
)

userRouter.route('/posloviFirmeZahtev').post(
    (req, res) => new UserController().posloviFirmeZahtev(req, res)
)

userRouter.route('/dekoraterOdbijZahtev').post(
    (req, res) => new UserController().dekoraterOdbijZahtev(req, res)
)

userRouter.route('/dekoraterPrihvatiOdrzavanje').post(
    (req, res) => new UserController().dekoraterPrihvatiOdrzavanje(req, res)
)

userRouter.route('/dekoraterOdbijOdrzavanje').post(
    (req, res) => new UserController().dekoraterOdbijOdrzavanje(req, res)
)


userRouter.route('/dekoraterPoslovi').post(
    (req, res) => new UserController().dekoraterPoslovi(req, res)
)

userRouter.route('/dekoraterOdrzavanja').post(
    (req, res) => new UserController().dekoraterOdrzavanja(req, res)
)

userRouter.route('/brojPoslovaPoMesecima').post(
    (req, res) => new UserController().brojPoslovaPoMesecima(req, res)
)

userRouter.route('/posloviMedjuDekoratorima').post(
    (req, res) => new UserController().posloviMedjuDekoratorima(req, res)
)

userRouter.route('/prosecnoPoDanima').post(
    (req, res) => new UserController().prosecnoPoDanima(req, res)
)







userRouter.route('/pocetnaBrojBasta').post(
    (req, res) => new UserController().pocetnaBrojBasta(req, res)
)

userRouter.route('/pocetnaBrojVlasnika').post(
    (req, res) => new UserController().pocetnaBrojVlasnika(req, res)
)

userRouter.route('/pocetnaBrojDekoratera').post(
    (req, res) => new UserController().pocetnaBrojDekoratera(req, res)
)

userRouter.route('/zakazaniPoslovi24').post(
    (req, res) => new UserController().zakazaniPoslovi24(req, res)
)

userRouter.route('/zakazaniPoslovi7').post(
    (req, res) => new UserController().zakazaniPoslovi7(req, res)
)

userRouter.route('/zakazaniPoslovi30').post(
    (req, res) => new UserController().zakazaniPoslovi30(req, res)
)

userRouter.route('/poslednjeSlike').post(
    (req, res) => new UserController().poslednjeSlike(req, res)
)

userRouter.route('/homeUpdate').post(
    (req, res) => new UserController().homeUpdate(req, res)
)

userRouter.route('/updateDekoraterStatus').post(
    (req, res) => new UserController().updateDekoraterStatus(req, res)
)

userRouter.route('/checkAktuelniPoslovi').post(
    (req, res) => new UserController().checkAktuelniPoslovi(req, res)
)

userRouter.route('/checkAktuelnoOdrzavanje').post(
    (req, res) => new UserController().checkAktuelnoOdrzavanje(req, res)
)






export default userRouter;