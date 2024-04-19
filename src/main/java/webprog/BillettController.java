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

    private boolean validerBillett(Billett billett){
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

    @PostMapping("/lagreBillett")
    public void lagreBillett(Billett billett, HttpServletResponse response) throws IOException {
        if(!validerBillett(billett)){
            response.sendError(HttpStatus.INTERNAL_SERVER_ERROR.value(),"Feil i Validering - prøv igjen");
        }
        else {
            if(!rep.lagreBillett(billett)) {
                response.sendError(HttpStatus.INTERNAL_SERVER_ERROR.value(),"Feil i DB - prøv igjen");
            }
        }
    }

    @GetMapping("/hentBilletter")
    public List<Billett> hentAlle (HttpServletResponse response) throws IOException {
        List<Billett> alleBilletter = rep.hentAlleBilletter();
        if(alleBilletter==null) {
            response.sendError(HttpStatus.INTERNAL_SERVER_ERROR.value(),"Feil i DB - prøv igjen");
        }
        return alleBilletter;
    }

    @GetMapping("/hentEnBillett")
    public Billett hentEnBillett(int id, HttpServletResponse response) throws IOException {
        Billett billetten = rep.hentEnBillett(id);
        if(billetten == null){
            response.sendError(HttpStatus.INTERNAL_SERVER_ERROR.value(),"Feil i DB - prøv igjen");
        }
        return billetten;
    }

    @PostMapping("/endreEnBillett")
    public void endreEnBillett(Billett billett, HttpServletResponse response) throws IOException{
        if(!validerBillett(billett)) {
            response.sendError(HttpStatus.INTERNAL_SERVER_ERROR.value(),"Feil i Validering - prøv igjen");
        }
        else {
            if(!rep.endreEnBillett(billett)){
                response.sendError(HttpStatus.INTERNAL_SERVER_ERROR.value(),"Feil i DB - prøv igjen");
            }
        }
    }

    @GetMapping("/slettEnBillett")
    public void slettEnBillett(int id,HttpServletResponse response) throws IOException{
        if(!rep.slettEnBillett(id)){
            response.sendError(HttpStatus.INTERNAL_SERVER_ERROR.value(),"Feil i DB - prøv igjen");
        }
    }

    @GetMapping("/slettAlleBilletter")
    public void slettAlle(HttpServletResponse response) throws IOException{
        if(!rep.slettAlleBilletter()){
            response.sendError(HttpStatus.INTERNAL_SERVER_ERROR.value(),"Feil i DB - prøv igjen");
        }
    }
}
