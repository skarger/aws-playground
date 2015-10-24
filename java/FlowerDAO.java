import java.sql.Connection;
import java.sql.DriverManager;
import java.sql.PreparedStatement;
import java.sql.ResultSet;
import java.sql.SQLException;
import java.sql.Statement;
import java.sql.Date;
import java.text.SimpleDateFormat;

public class FlowerDAO {
    private Connection connect = null;
    private Statement statement = null;
    private ResultSet resultSet = null;

    public void readDataBase() throws Exception {
        try {
            // This will load the MySQL driver, each DB has its own driver
            Class.forName("com.mysql.jdbc.Driver");
            // Setup the connection with the DB
            String db_name = "db_name";
            String user = "user";
            String password = "password";
            connect = DriverManager
            //.getConnection("jdbc:mysql://localhost/my_test_db?" + "user=my_test_user&password=my_password");
            .getConnection("jdbc:mysql://my-test-db-instance.ctkdym4iekhg.us-east-1.rds.amazonaws.com:3306/" +
                    db_name + "?" + "user=" + user + "&password=" + password);



            System.out.println("Creating FLOWERS table in database...");
            statement = connect.createStatement();
            statement.executeUpdate("drop table if exists FLOWERS");

            statement = connect.createStatement();

            String sql = "CREATE TABLE FLOWERS " +
                    "( name VARCHAR(30), " +
                    " description VARCHAR(255), " +
                    " typical_height_inches INTEGER)";

            statement.executeUpdate(sql);

            // Statements allow to issue SQL queries to the database
            statement = connect.createStatement();
            // Result set get the result of the SQL query
            resultSet = statement
                    .executeQuery("select * from my_test_db.FLOWERS");
            writeResultSet(resultSet);

            // PreparedStatements can use variables and are more efficient
            PreparedStatement preparedStatement = connect
                    .prepareStatement("insert into my_test_db.FLOWERS values (?, ?, ?)");
            // "name, description, typical_height_inches");
            // Parameters start with 1

            // 1
            preparedStatement.setString(1, "hyacinth");
            preparedStatement.setString(2, "The perfume of blooming hyacinths is as symbolic of early spring as lilacs are " +
                    "to the late-spring garden. Hyacinth plants consist of chubby, succulent leaves arranged " +
                    "around a central flower spike. Florets pack the flower column in tight clusters.");
            preparedStatement.setInt(3, 24);
            preparedStatement.executeUpdate();

            // 2
            preparedStatement.setString(1, "gladiolus");
            preparedStatement.setString(2, "The retro look of gladiolus flowers is popular once again. These easy-to-grow " +
                    "bulbs bring a lot to the garden party, including a huge color palette, vertical interest, " +
                    "and bloom times that harmonize well with summer''s most colorful perennials.");
            preparedStatement.setInt(3, 60);
            preparedStatement.executeUpdate();

            // 3
            preparedStatement.setString(1, "chrysanthemum");
            preparedStatement.setString(2, "Chrysanthemums are a must-have for the fall garden. No other late-season " +
                    "flower delivers as much color, for as long and as reliably as good ol' mums.");
            preparedStatement.setInt(3, 24);
            preparedStatement.executeUpdate();

            // 4
            preparedStatement.setString(1, "primrose");
            preparedStatement.setString(2, "Take a walk down the primrose path and you'll never look back! " +
                    "Primroses are a classic cottage flower and are popular with collectors.");
            preparedStatement.setInt(3, 18);
            preparedStatement.executeUpdate();

            preparedStatement = connect
                    .prepareStatement("SELECT name, description, typical_height_inches from my_test_db.FLOWERS");
            resultSet = preparedStatement.executeQuery();
            writeResultSet(resultSet);

            // Remove again the insert comment
            preparedStatement = connect
                    .prepareStatement("delete from my_test_db.FLOWERS where name = ? ; ");
            preparedStatement.setString(1, "primrose");
            preparedStatement.executeUpdate();

            resultSet = statement
                    .executeQuery("select * from my_test_db.FLOWERS");
            writeMetaData(resultSet);

        } catch (Exception e) {
            throw e;
        } finally {
            close();
        }

    }

    private void writeMetaData(ResultSet resultSet) throws SQLException {
        //   Now get some metadata from the database
        // Result set get the result of the SQL query

        System.out.println("The columns in the table are: ");

        System.out.println("Table: " + resultSet.getMetaData().getTableName(1));
        for  (int i = 1; i<= resultSet.getMetaData().getColumnCount(); i++){
            System.out.println("Column " +i  + " "+ resultSet.getMetaData().getColumnName(i));
        }
    }

    private void writeResultSet(ResultSet resultSet) throws SQLException {
        // ResultSet is initially before the first data set
        while (resultSet.next()) {
            // It is possible to get the columns via name
            // also possible to get the columns via the column number
            // which starts at 1
            // e.g. resultSet.getString(2);
            String name = resultSet.getString("name");
            String description = resultSet.getString("description");
            Integer typical_height_inches = resultSet.getInt("typical_height_inches");
            System.out.println("Name: " + name);
            System.out.println("Description: " + description);
            System.out.println("Typical Height in Inches: " + typical_height_inches);
        }
    }

    // You need to close the resultSet
    private void close() {
        try {
            if (resultSet != null) {
                resultSet.close();
            }

            if (statement != null) {
                statement.close();
            }

            if (connect != null) {
                connect.close();
            }
        } catch (Exception e) {

        }
    }

}
