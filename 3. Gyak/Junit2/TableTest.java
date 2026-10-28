package hu.szoftverteszteles;

import org.junit.jupiter.api.DisplayName;
import org.junit.jupiter.api.Test;

import static org.junit.jupiter.api.Assertions.*;

public class TableTest {
    @Test
    @DisplayName("Terület számítás tesztelése (szélesség * hossz)")
    void testArea() {
        Table table = new Table(100, 200, 75, 4, "red");
        assertEquals(20000, table.area());
    }

    @Test
    @DisplayName("Kapacitás számítása (60 cm-enként 1 személy a kerület mentén)")
    void testCapacity() {
        // Kerület = 2 * (60 + 120) = 360 cm -> 360 / 60 = 6 fő
        Table table = new Table(60, 120, 75, 4, "red");
        assertEquals(6, table.getCapacity());
    }

    @Test
    @DisplayName("Magasság állítás sikeres, ha állítható és [0, 200] között van")
    void testSetHeightWhenAdjustable() {
        Table table = new Table(80, 120, 75, 4, "red", 75, true);
        table.setHeight(110);
        assertEquals(110, table.getCurrentHeight());
    }

    @Test
    @DisplayName("Magasság nem változik, ha az asztal nem állítható")
    void testSetHeightWhenNotAdjustable() {
        Table table = new Table(80, 120, 75, 4, "red"); // isAdjustable = false
        table.setHeight(100);
        assertEquals(75, table.getCurrentHeight());
    }

    @Test
    @DisplayName("Magasság nem változik, ha az új érték kívül esik a [0, 200] intervallumon")
    void testSetHeightInvalidRange() {
        Table table = new Table(80, 120, 75, 4, "red", 75, true);
        table.setHeight(250); // 200 felett
        assertEquals(75, table.getCurrentHeight());

        table.setHeight(-10); // 0 alatt
        assertEquals(75, table.getCurrentHeight());
    }

    @Test
    @DisplayName("Az asztal színezése sikeres")
    void testRepaint() {
        Table table = new Table(80, 120, 75, 4, "red");
        String result = table.repaint("blue");
        assertEquals("blue", result);
        assertEquals("blue", table.getColor());
    }

    @Test
    @DisplayName("Az asztal stabil, ha 3 vagy több lába van")
    void testIsStable() {
        Table table1 = new Table(80, 120, 75, 3, "red");
        assertTrue(table1.isStable());

        Table table2 = new Table(80, 120, 75, 2, "red");
        assertFalse(table2.isStable());
    }

    @Test
    @DisplayName("Az asztal összecsukható, ha állítható és 4 lába van")
    void testIsFoldable() {
        Table table1 = new Table(80, 120, 75, 4, "red", 75, true);
        assertTrue(table1.isFoldable(4));

        Table table2 = new Table(80, 120, 75, 4, "red"); // not adjustable
        assertFalse(table2.isFoldable(4));

        Table table3 = new Table(80, 120, 75, 3, "red", 75, true);
        assertFalse(table3.isFoldable(3));
    }

    @Test
    @DisplayName("Az asztal kerületének számítása")
    void testGetPerimeter() {
        Table table = new Table(80, 120, 75, 4, "red");
        assertEquals(400, table.getPerimeter(80, 120));
    }
}
