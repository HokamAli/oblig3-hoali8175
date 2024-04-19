package webprog;

import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.jdbc.core.BeanPropertyRowMapper;
import org.springframework.jdbc.core.JdbcTemplate;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public class KundeRepository {

    @Autowired
    private JdbcTemplate db;

    private static final Logger logger = LoggerFactory.getLogger(KundeRepository.class);

    public boolean lagreKunde(Kunde kunde) {
        String sql = "INSERT INTO Kunde (filmnavn,antall,fornavn,etternavn,telefonnummer,epost) VALUES(?,?,?,?,?,?)";
        try{
            db.update(sql,kunde.getFilmnavn(),kunde.getAntall(),kunde.getFornavn(),kunde.getEtternavn(),kunde.getTelefonnummer(),kunde.getEpost());
            return true;
        }
        catch(Exception e){
            logger.error("Feil i lagreKunde : "+e);
            return false;
        }
    }

    public List<Kunde> hentAlleKunder() {
        String sql = "SELECT * FROM Kunde";
        try{
            List<Kunde> alleKunder = db.query(sql,new BeanPropertyRowMapper(Kunde.class));
            return alleKunder;
        }
        catch (Exception e){
            logger.error("Feil i hentAlleKunder : "+e);
            return null;
        }
    }

    public Kunde hentEnKunde(int id) {
        String sql = "SELECT * FROM Kunde WHERE id=?";
        try{
            Kunde enKunde = db.queryForObject(sql,BeanPropertyRowMapper.newInstance(Kunde.class),id);
            return enKunde;
        }
        catch(Exception e) {
            logger.error("Feil i hentEnKunde : " + e);
            return null;
        }
    }

    public boolean endreEnKunde(Kunde kunde){
        String sql = "UPDATE Kunde SET filmnavn=?,antall=?,fornavn=?,etternavn=?,telefonnummer=?,epost=? where id=?";
        try{
            db.update(sql,kunde.getFilmnavn(),kunde.getAntall(),kunde.getFornavn(),kunde.getEtternavn(),kunde.getTelefonnummer(),kunde.getEpost(),kunde.getId());
            return true;
        }
        catch(Exception e){
            logger.error("Feil i endreEnKunde : "+e);
            return false;
        }
    }

    public boolean slettEnKunde(int id) {
        String sql = "DELETE FROM Kunde WHERE id=?";
        try {
            db.update(sql,id);
            return true;
        }
        catch(Exception e){
            logger.error("Feil i slettEnKunde : "+e);
            return false;
        }
    }

    public boolean slettAlleKunder () {
        String sql = "DELETE FROM Kunde";
        try {
            db.update(sql);
            return true;
        }
        catch(Exception e){
            logger.error("Feil i slettAlleKunder : "+e);
            return false;
        }
    }
}
