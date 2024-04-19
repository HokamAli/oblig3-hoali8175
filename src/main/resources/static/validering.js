function validerFilmnavn(filmnavn){
    const regexp = /^(Indiana Jones and the Dial of Destiny|Avengers Infinity War|Spiderman Far From Home)$/;
    const ok = regexp.test(filmnavn);
    if(!ok){
        $("#feilFilmnavn").html("Velg filmnavn");
        return false;
    }
    else{
        $("#feilFilmnavn").html("");
        return true;
    }
}

function validerAntall(antall){
    const regexp = /^[0-9. \-]{1,9}$/;
    const ok = regexp.test(antall);
    if(!ok){
        $("#feilAntall").html("Antall biletter må bestå av mellom 1 til 9 biletter");
        return false;
    }
    else{
        $("#feilAntall").html("");
        return true;
    }
}
function validerFornavn(fornavn){
    const regexp = /^[a-zA-ZæøåÆØÅ. \-]{2,50}$/;
    const ok = regexp.test(fornavn);
    if(!ok){
        $("#feilFornavn").html("Fornavnet kan bare bestå av minst to bokstaver");
        return false;
    }
    else{
        $("#feilFornavn").html("");
        return true;
    }
}

function validerEtternavn(etternavn){
    const regexp = /^[a-zA-ZæøåÆØÅ. \-]{2,50}$/;
    const ok = regexp.test(etternavn);
    if(!ok){
        $("#feilEtternavn").html("Etternavnet kan bare bestå av minst to bokstaver");
        return false;
    }
    else{
        $("#feilEtternavn").html("");
        return true;
    }
}

function validerTelefonnummer(telefonnummer){
    const regexp = /^[0-9. \-]{8}$/;
    const ok = regexp.test(telefonnummer);
    if(!ok){
        $("#feilTelefonnummer").html("Telefonnummer må bestå av 8 TALL");
        return false;
    }
    else{
        $("#feilTelefonnummer").html("");
        return true;
    }
}

function validerEpost(epost){
    const regexp = /^\S+@\S+\.\S\S+$/;
    const ok = regexp.test(epost);
    if(!ok){
        $("#feilEpost").html("Epost må bestå av formaten: xxxx@xxxx.xx , altså .no");
        return false;
    }
    else{
        $("#feilEpost").html("");
        return true;
    }
}