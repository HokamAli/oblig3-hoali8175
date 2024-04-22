$(function(){
    // Henter alle billetter når siden lastes
    hentAlleBilletter();
});

function hentAlleBilletter() {
    // Henter alle billetter fra serveren og formaterer dem
    $.get( "/hentBilletter", function( billetter ) {
        formaterBilletter(billetter);
    })
        .fail(function(jqXHR) {
            // Håndterer feil hvis det oppstår problemer under henting av billetter
            const json = $.parseJSON(jqXHR.responseText);
            $("#feil").html(json.message);
        });
}

function formaterBilletter(billetter){
    // Sorterer billettene etter etternavn
    billetter.sort((a, b) => (a.etternavn > b.etternavn) ? 1 : -1);


    let ut = "<table class='table table-striped'>" +
        "<tr>" +
        "<th>Filmnavn</th><th>Antall</th><th>Fornavn</th><th>Etternavn</th><th>Telefonnummer</th><th>Epost</th><th></th>" +
        "</tr>";
    for(const billett of billetter ){
        ut+="<tr>" +
            "<td>"+billett.filmnavn+"</td>"+
            "<td>"+billett.antall+"</td>"+
            "<td>"+billett.fornavn+"</td>"+
            "<td>"+billett.etternavn+"</td>"+
            "<td>"+billett.telefonnummer+"</td>"+
            "<td>"+billett.epost+"</td>"+
            "<td> <a class='btn btn-primary' href='endreBillett.html?id="+billett.id+"'>Endre</a></td>"+
            "<td> <button class='btn btn-danger' onclick='slettEnBillett("+billett.id+")'>Slett</button></td>"+
            "</tr>";
    }
    $("#billettene").html(ut);
}

function slettEnBillett(id) {
    // Sletter en billett basert på ID-en og oppdaterer siden
    const url = "/slettEnBillett?id="+id;
    $.get( url, function() {
        window.location.href = 'index.html';
    })
        .fail(function(jqXHR) {
            const json = $.parseJSON(jqXHR.responseText);
            $("#feil").html(json.message);
        });
}

function slettBillettene() {
    // Sletter alle billetter og oppdaterer siden
    $.get( "/slettAlleBilletter", function() {
        window.location.href = 'index.html';
    })
        .fail(function(jqXHR) {
            // Håndterer feil hvis det oppstår problemer under sletting av alle billetter
            const json = $.parseJSON(jqXHR.responseText);
            $("#feil").html(json.message);
        });
}

function validerOgLagreBillett(){
    // Validerer inndata og lagrer billetten hvis alt er gyldig
    const filmnavnOK = validerFilmnavn($("#filmnavn").val());
    const antallOK = validerAntall($("#antall").val());
    const fornavnOK = validerFornavn($("#fornavn").val());
    const etternavnOK = validerEtternavn($("#etternavn").val());
    const telefonnummerOK = validerTelefonnummer($("#telefonnummer").val());
    const epostOK = validerEpost($("#epost").val());
    if (filmnavnOK && antallOK && fornavnOK && etternavnOK && telefonnummerOK && epostOK){
        lagreBillett();
    }
}

function lagreBillett() {
    // Lagrer billetten ved å sende data til serveren og oppdaterer siden
    const billett = {
        filmnavn : $("#filmnavn").val(),
        antall : $("#antall").val(),
        fornavn : $("#fornavn").val(),
        etternavn : $("#etternavn").val(),
        telefonnummer : $("#telefonnummer").val(),
        epost : $("#epost").val(),
    };
    const url = "/lagreBillett";
    $.post( url, billett, function() {
        window.location.href = 'index.html';
    })
        .fail(function(jqXHR) {
            // Håndterer feil hvis det oppstår problemer under lagring av billett
            const json = $.parseJSON(jqXHR.responseText);
            $("#feil").html(json.message);
        });
}