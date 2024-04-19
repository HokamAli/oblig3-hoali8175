package webprog;

import jakarta.servlet.http.HttpServletResponse;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RestController;

import java.io.IOException;
import java.util.List;

@RestController
public class BillettController {

    @Autowired
    private BillettRepository rep;

    private Logger logger = LoggerFactory.getLogger(BillettController.class);

    private boolean validerKunde(Billett billett){
        //String regexNavn = "[a-zA-ZæøåÆØÅ. \\-]{2,20}";
        String regexFilmnavn = "(Indiana Jones and the Dial of Destiny|Avengers Infinity War|Spiderman Far From Home)";
        String regexAntall = "[0-9.\\-]{1,9}";
        String regexFornavn = "[a-zA-ZæøåÆØÅ .\\-]{2,50}";
        String regexEtternavn = "[a-zA-ZæøåÆØÅ .\\-]{2,50}";
        String regexTelefonnummer = "[0-9.\\-]{8}";
        String regexEpost = "\\S+@\\S+\\.\\S\\S";

        boolean filmnavnOK = billett.getFilmnavn().matches(regexFilmnavn);
        boolean antallOK = billett.getAntall().matches(regexAntall);
        boolean fornavnOK = billett.getFornavn().matches(regexFornavn);
        boolean etternavnOK = billett.getEtternavn().matches(regexEtternavn);
        boolean telefonnummerOK = billett.getTelefonnummer().matches(regexTelefonnummer);
        boolean epostOK = billett.getEpost().matches(regexEpost);

        if (filmnavnOK && antallOK && fornavnOK && etternavnOK && telefonnummerOK && epostOK){
            return true;
        }
        logger.error("Valideringsfeil");
        return false;
    }

    @PostMapping("/lagreKunde")
    public void lagreKunde(Billett billett, HttpServletResponse response) throws IOException {
        if(!validerKunde(billett)){
            response.sendError(HttpStatus.INTERNAL_SERVER_ERROR.value(),"Feil i Validering - prøv igjen");
        }
        else {
            if(!rep.lagreKunde(billett)) {
                response.sendError(HttpStatus.INTERNAL_SERVER_ERROR.value(),"Feil i DB - prøv igjen");
            }
        }
    }

    @GetMapping("/hentKunder")
    public List<Billett> hentAlle (HttpServletResponse response) throws IOException {
        List<Billett> alleKunder = rep.hentAlleKunder();
        if(alleKunder==null) {
            response.sendError(HttpStatus.INTERNAL_SERVER_ERROR.value(),"Feil i DB - prøv igjen");
        }
        return alleKunder;
    }

    @GetMapping("/hentEnKunde")
    public Billett hentEnKunde(int id, HttpServletResponse response) throws IOException {
        Billett kunden = rep.hentEnKunde(id);
        if(kunden == null){
            response.sendError(HttpStatus.INTERNAL_SERVER_ERROR.value(),"Feil i DB - prøv igjen");
        }
        return kunden;
    }

    @PostMapping("/endreEnKunde")
    public void endreEnKunde(Billett billett, HttpServletResponse response) throws IOException{
        if(!validerKunde(billett)) {
            response.sendError(HttpStatus.INTERNAL_SERVER_ERROR.value(),"Feil i Validering - prøv igjen");
        }
        else {
            if(!rep.endreEnKunde(billett)){
                response.sendError(HttpStatus.INTERNAL_SERVER_ERROR.value(),"Feil i DB - prøv igjen");
            }
        }
    }

    @GetMapping("/slettEnKunde")
    public void slettEnKunde(int id,HttpServletResponse response) throws IOException{
        if(!rep.slettEnKunde(id)){
            response.sendError(HttpStatus.INTERNAL_SERVER_ERROR.value(),"Feil i DB - prøv igjen");
        }
    }

    @GetMapping("/slettAlleKunder")
    public void slettAlle(HttpServletResponse response) throws IOException{
        if(!rep.slettAlleKunder()){
            response.sendError(HttpStatus.INTERNAL_SERVER_ERROR.value(),"Feil i DB - prøv igjen");
        }
    }
}
