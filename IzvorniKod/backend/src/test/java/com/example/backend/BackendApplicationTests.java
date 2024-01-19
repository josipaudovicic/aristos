package com.example.backend;

import static org.junit.jupiter.api.Assertions.*;
import static org.mockito.Mockito.*;

import java.util.*;

import com.example.backend.korisnik.*;
import com.example.backend.korisnik.HelpingTables.BelongsToStation;
import com.example.backend.korisnik.HelpingTables.BelongsToStationRepository;
import com.example.backend.korisnik.station.Station;
import com.example.backend.korisnik.station.StationRepository;
import com.example.backend.korisnik.station.StationService;
import com.example.backend.korisnik.vehicle.VehicleRepository;
import com.example.backend.korisnik.vehicle.VehicleService;
import jakarta.transaction.Transactional;
import org.junit.jupiter.api.Test;
import org.junit.jupiter.api.extension.ExtendWith;
import org.mockito.InjectMocks;
import org.mockito.Mock;
import org.mockito.Mockito;
import org.mockito.junit.jupiter.MockitoExtension;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.context.SpringBootTest;
import org.springframework.boot.test.mock.mockito.MockBean;
import org.springframework.test.context.junit.jupiter.SpringExtension;

import javax.management.relation.Role;

@SpringBootTest
@Transactional
class BackendApplicationTests {


    @InjectMocks
    private AdminServiceJpa adminService;

    @InjectMocks
    private UserService userService;

    @InjectMocks
    private StationService stationService;

    @InjectMocks
    private VehicleService vehicleService;

    @Mock
    private UserRepository userRepository = Mockito.mock(UserRepository.class);

    @Mock
    private StationRepository stationRepository = Mockito.mock(StationRepository.class);

    @Mock
    private VehicleRepository vehicleRepository = Mockito.mock(VehicleRepository.class);

    @Mock
    private BelongsToStationRepository belongsToStationRepository = Mockito.mock(BelongsToStationRepository.class);


    @Test
    @Transactional
    //Testiranje vraća li grešku funkcija za dohvaćanje korisnika s nepostojećim korisničkim imenom
    void testGetUserByUsernameThatDoesNotExist() {
        String username = "TestUser";
        assertThrows(IllegalStateException.class, () -> userService.getUserByUsername(username));
    }

    @Test
    @Transactional
    //Testiranje vraća li funkcija pravog korisnika za dohvaćanje korisnika s postojećim korisničkim imenom
    void testGetUserByUsernameThatExists() {
        String username = "testUser";
        Users expectedUser = new Users(username, "email", "password", "name", "surname"); // Adjust based on your Users entity

        when(userRepository.findById(username)).thenReturn(Optional.of(expectedUser));

        Users actualUser = userService.getUserByUsername(username);
        assertEquals(expectedUser, actualUser);
    }

    @Test
    @Transactional
    //Test hoće li funkcija vratiti True ako stanica već ima dodijeljenog voditelja
    void testStationAlreadyHasManager() {
        String stationName = "TestStation";
        Long stationId = 1L;
        String username = "testManager";

        List<Station> stations = Arrays.asList(new Station(stationId, stationName));
        when(stationRepository.findAll()).thenReturn(stations);

        List<BelongsToStation> belongsToStationList = Arrays.asList(new BelongsToStation(username, stationId));
        when(belongsToStationRepository.findAll()).thenReturn(belongsToStationList);

        Users testUser = mock(Users.class);
        when(userRepository.getReferenceById(username)).thenReturn(testUser);

        Roles testRole = mock(Roles.class);
        when(testUser.getRole()).thenReturn(testRole);
        when(testRole.getRoleName()).thenReturn("Voditelj postaje");

        assertTrue(adminService.stationHasManager(stationName));
    }

    @Test
    @Transactional
    //Test hoće li funkcija baciti grešku ako je uneseno ime nepostojeće postaje
    void testStationAlreadyHasManagerNonExistentStation() {
        String stationName = "NonExistentTestStation";
        assertThrows(IllegalStateException.class, () -> adminService.stationHasManager(stationName));
    }

    @Test
    @Transactional
    //Test hoće li funkcija za nepostojeći ID vozila baciti gresku
    void testFindVehicleByNonexistentId() {
        Long nonExistentVehicleId = 10L;
        assertThrows(IllegalStateException.class, () -> vehicleService.findVehicleById(nonExistentVehicleId));
    }
    @Test
    @Transactional
    //Test hoće li funkcija za dobro ime, ali lošu lozinku vratiti False
    public void testLoginInvalidPassword() {
        String testUsername = "testUser";
        String testCorrectPassword = "testCorrectPassword";
        String testWrongPassword = "testWrongPassword";
        Users testUser = new Users(testUsername, "testUser@gmail.com", testCorrectPassword, "Test", "User");

        when(userRepository.existsById(testUsername)).thenReturn(true);
        when(userRepository.getReferenceById(testUsername)).thenReturn(testUser);

        assertFalse(userService.login(testUsername, testWrongPassword));
    }
}
