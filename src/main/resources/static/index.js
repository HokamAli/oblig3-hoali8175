$(function(){
    hentAlleBilletter();
});

function hentAlleBilletter() {
    $.get( "/hentBilletter", function( billetter ) {
        formaterBilletter(billetter);
    })
        .fail(function(jqXHR) {
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
            "<td> <a class='btn btn-primary' href="+billett.id+"'endreBillett.html?id='>Endre</a></td>"+
            "<td> <button class='btn btn-danger' onclick='slettEnBillett("+billett.id+")'>Slett</button></td>"+
            "</tr>";
    }
    $("#billettene").html(ut);
}

function slettEnBillett(id) {
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
    $.get( "/slettAlleBilletter", function() {
        window.location.href = 'index.html';
    })
        .fail(function(jqXHR) {
            const json = $.parseJSON(jqXHR.responseText);
            $("#feil").html(json.message);
        });
}

function validerOgLagreBillett(){
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
            const json = $.parseJSON(jqXHR.responseText);
            $("#feil").html(json.message);
        });
}