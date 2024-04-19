$(function(){
    // hent kunden med kunde-id fra url og vis denne i skjemaet
    const id = window.location.search.substring(1);
    const url = "/hentEnKunde?"+id;
    $.get(url,function(kunde){
        $("#id").val(kunde.id); // må ha med id inn skjemaet, hidden i html
        $("#filmnavn").val(kunde.filmnavn);
        $("#antall").val(kunde.antall);
        $("#fornavn").val(kunde.fornavn);
        $("#etternavn").val(kunde.etternavn);
        $("#telefonnummer").val(kunde.telefonnummer);
        $("#epost").val(kunde.epost);
    })
        .fail(function(jqXHR) {
            const json = $.parseJSON(jqXHR.responseText);
            $("#feil").html(json.message);
        });
});

function validerOgEndreKunden(){
    const filmnavnOK = validerFilmnavn($("#filmnavn").val());
    const antallOK = validerAntall($("#antall").val());
    const fornavnOK = validerFornavn($("#fornavn").val());
    const etternavnOK = validerEtternavn($("#etternavn").val());
    const telefonnummerOK = validerTelefonnummer($("#telefonnummer").val());
    const epostOK = validerEpost($("#epost").val());
    if (filmnavnOK && antallOK && fornavnOK && etternavnOK && telefonnummerOK && epostOK){
        endreKunden();
        return true;
    }
    return false;
}

function endreKunden() {
    const kunde = {
        id : $("#id").val(), // må ha med denne som ikke har blitt endret for å vite hvilken kunde som skal endres
        filmnavn : $("#filmnavn").val(),
        antall : $("#antall").val(),
        fornavn : $("#fornavn").val(),
        etternavn : $("#etternavn").val(),
        telefonnummer : $("#telefonnummer").val(),
        epost : $("#epost").val()
    };
    $.post("/endreEnKunde",kunde,function(){
        window.location.href = "/";
    })
        .fail(function(jqXHR) {
            const json = $.parseJSON(jqXHR.responseText);
            $("#feil").html(json.message);
        });
}

