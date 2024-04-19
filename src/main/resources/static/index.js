$(function(){
    hentAlleKunder();
});

function hentAlleKunder() {
    $.get( "/hentKunder", function( kunder ) {
        formaterKunder(kunder);
    })
        .fail(function(jqXHR) {
            const json = $.parseJSON(jqXHR.responseText);
            $("#feil").html(json.message);
        });
}

function formaterKunder(kunder){
    // Sorterer kundene etter etternavn
    kunder.sort((a, b) => (a.etternavn > b.etternavn) ? 1 : -1);


    let ut = "<table class='table table-striped'>" +
        "<tr>" +
        "<th>Filmnavn</th><th>Antall</th><th>Fornavn</th><th>Etternavn</th><th>Telefonnummer</th><th>Epost</th><th></th>" +
        "</tr>";
    for(const kunde of kunder ){
        ut+="<tr>" +
            "<td>"+kunde.filmnavn+"</td>"+
            "<td>"+kunde.antall+"</td>"+
            "<td>"+kunde.fornavn+"</td>"+
            "<td>"+kunde.etternavn+"</td>"+
            "<td>"+kunde.telefonnummer+"</td>"+
            "<td>"+kunde.epost+"</td>"+
            "<td> <a class='btn btn-primary' href="+kunde.id+"'endreBillett.html?id='>Endre</a></td>"+
            "<td> <button class='btn btn-danger' onclick='slettEnKunde("+kunde.id+")'>Slett</button></td>"+
            "</tr>";
    }
    $("#kundene").html(ut);
}

function slettEnKunde(id) {
    const url = "/slettEnKunde?id="+id;
    $.get( url, function() {
        window.location.href = 'index.html';
    })
        .fail(function(jqXHR) {
            const json = $.parseJSON(jqXHR.responseText);
            $("#feil").html(json.message);
        });
}

function slettKundene() {
    $.get( "/slettAlleKunder", function() {
        window.location.href = 'index.html';
    })
        .fail(function(jqXHR) {
            const json = $.parseJSON(jqXHR.responseText);
            $("#feil").html(json.message);
        });
}

function validerOgLagreKunde(){
    const filmnavnOK = validerFilmnavn($("#filmnavn").val());
    const antallOK = validerAntall($("#antall").val());
    const fornavnOK = validerFornavn($("#fornavn").val());
    const etternavnOK = validerEtternavn($("#etternavn").val());
    const telefonnummerOK = validerTelefonnummer($("#telefonnummer").val());
    const epostOK = validerEpost($("#epost").val());
    if (filmnavnOK && antallOK && fornavnOK && etternavnOK && telefonnummerOK && epostOK){
        lagreKunde();
    }
}

function lagreKunde() {
    const kunde = {
        filmnavn : $("#filmnavn").val(),
        antall : $("#antall").val(),
        fornavn : $("#fornavn").val(),
        etternavn : $("#etternavn").val(),
        telefonnummer : $("#telefonnummer").val(),
        epost : $("#epost").val(),
    };
    const url = "/lagreKunde";
    $.post( url, kunde, function() {
        window.location.href = 'index.html';
    })
        .fail(function(jqXHR) {
            const json = $.parseJSON(jqXHR.responseText);
            $("#feil").html(json.message);
        });
}