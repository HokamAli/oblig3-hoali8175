$(function(){
    // hent kunden med kunde-id fra url og vis denne i skjemaet
    const id = window.location.search.substring(1);
    const url = "/hentEnBillett?"+id;
    $.get(url,function(billett){
        $("#id").val(billett.id); // må ha med id inn skjemaet, hidden i html
        $("#filmnavn").val(billett.filmnavn);
        $("#antall").val(billett.antall);
        $("#fornavn").val(billett.fornavn);
        $("#etternavn").val(billett.etternavn);
        $("#telefonnummer").val(billett.telefonnummer);
        $("#epost").val(billett.epost);
    })
        .fail(function(jqXHR) {
            const json = $.parseJSON(jqXHR.responseText);
            $("#feil").html(json.message);
        });
});

function validerOgEndreBilletten(){
    const filmnavnOK = validerFilmnavn($("#filmnavn").val());
    const antallOK = validerAntall($("#antall").val());
    const fornavnOK = validerFornavn($("#fornavn").val());
    const etternavnOK = validerEtternavn($("#etternavn").val());
    const telefonnummerOK = validerTelefonnummer($("#telefonnummer").val());
    const epostOK = validerEpost($("#epost").val());
    if (filmnavnOK && antallOK && fornavnOK && etternavnOK && telefonnummerOK && epostOK){
        endreBilletten();
        return true;
    }
    return false;
}

function endreBilletten() {
    const billett = {
        id : $("#id").val(), // må ha med denne som ikke har blitt endret for å vite hvilken kunde som skal endres
        filmnavn : $("#filmnavn").val(),
        antall : $("#antall").val(),
        fornavn : $("#fornavn").val(),
        etternavn : $("#etternavn").val(),
        telefonnummer : $("#telefonnummer").val(),
        epost : $("#epost").val()
    };
    $.post("/endreEnBillett",billett,function(){
        window.location.href = "/";
    })
        .fail(function(jqXHR) {
            const json = $.parseJSON(jqXHR.responseText);
            $("#feil").html(json.message);
        });
}

