package webprog;

import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.jdbc.core.BeanPropertyRowMapper;
import org.springframework.jdbc.core.JdbcTemplate;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public class BillettRepository {

    @Autowired
    private JdbcTemplate db;

    private static final Logger logger = LoggerFactory.getLogger(BillettRepository.class);

    public boolean lagreBillett(Billett billett) {
        String sql = "INSERT INTO Billett (filmnavn,antall,fornavn,etternavn,telefonnummer,epost) VALUES(?,?,?,?,?,?)";
        try{
            db.update(sql, billett.getFilmnavn(), billett.getAntall(), billett.getFornavn(), billett.getEtternavn(), billett.getTelefonnummer(), billett.getEpost());
            return true;
        }
        catch(Exception e){
            logger.error("Feil i lagreBillett : "+e);
            return false;
        }
    }

    public List<Billett> hentAlleBilletter() {
        String sql = "SELECT * FROM Billett";
        try{
            List<Billett> alleBilletter = db.query(sql,new BeanPropertyRowMapper(Billett.class));
            return alleBilletter;
        }
        catch (Exception e){
            logger.error("Feil i hentAlleBilletter : "+e);
            return null;
        }
    }

    public Billett hentEnBillett(int id) {
        String sql = "SELECT * FROM Billett WHERE id=?";
        try{
            Billett enBillett = db.queryForObject(sql,BeanPropertyRowMapper.newInstance(Billett.class),id);
            return enBillett;
        }
        catch(Exception e) {
            logger.error("Feil i hentEnBillett : " + e);
            return null;
        }
    }

    public boolean endreEnBillett(Billett billett){
        String sql = "UPDATE Billett SET filmnavn=?,antall=?,fornavn=?,etternavn=?,telefonnummer=?,epost=? where id=?";
        try{
            db.update(sql, billett.getFilmnavn(), billett.getAntall(), billett.getFornavn(), billett.getEtternavn(), billett.getTelefonnummer(), billett.getEpost(), billett.getId());
            return true;
        }
        catch(Exception e){
            logger.error("Feil i endreEnBillett : "+e);
            return false;
        }
    }

    public boolean slettEnBillett(int id) {
        String sql = "DELETE FROM Billett WHERE id=?";
        try {
            db.update(sql,id);
            return true;
        }
        catch(Exception e){
            logger.error("Feil i slettEnBillett : "+e);
            return false;
        }
    }

    public boolean slettAlleBilletter () {
        String sql = "DELETE FROM Billetter";
        try {
            db.update(sql);
            return true;
        }
        catch(Exception e){
            logger.error("Feil i slettAlleBilletter : "+e);
            return false;
        }
    }
}
