package webprog;

public class Billett {
    private int id;
    private String filmnavn;
    private String antall;
    private String fornavn;
    private String etternavn;
    private String telefonnummer;
    private String epost;

    public Billett() {
    }

    public Billett(int id, String filmnavn, String antall, String fornavn, String etternavn, String telefonnummer, String epost) {
        this.id = id;
        this.filmnavn = filmnavn;
        this.antall = antall;
        this.fornavn = fornavn;
        this.etternavn = etternavn;
        this.telefonnummer = telefonnummer;
        this.epost = epost;
    }

    public int getId() {
        return id;
    }

    public void setId(int id) {
        this.id = id;
    }

    public String getFilmnavn() {
        return filmnavn;
    }

    public void setFilmnavn(String filmnavn) {
        this.filmnavn = filmnavn;
    }

    public String getAntall() {
        return antall;
    }

    public void setAntall(String antall) {
        this.antall = antall;
    }

    public String getFornavn(){
        return fornavn;
    }
    public void setFornavn(String fornavn){
        this.fornavn = fornavn;
    }

    public String getEtternavn(){
        return etternavn;
    }
    public void setEtternavn(String etternavn){
        this.etternavn = etternavn;
    }

    public String getTelefonnummer() {
        return telefonnummer;
    }

    public void setTelefonnummer(String telefonnummer) {
        this.telefonnummer = telefonnummer;
    }

    public String getEpost(){
        return epost;
    }
    public void setEpost(String epost){
        this.epost = epost;
    }
}

