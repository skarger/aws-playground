public class MySQLAccess {
    public static void main(String[] args) throws Exception {
        FlowerDAO dao = new FlowerDAO();
        dao.readDataBase();
    }

}
