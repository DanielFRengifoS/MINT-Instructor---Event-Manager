package MINT.controller;

import MINT.model.Event;
import MINT.model.Instructor;
import MINT.service.InstructorService;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import java.util.List;
import java.util.Optional;

@RestController
@RequestMapping("/api/instructors")
@CrossOrigin(origins = "http://localhost:4200")
public class InstructorController {
    private final InstructorService instructorService;

    public InstructorController(InstructorService instructorService) {
        this.instructorService = instructorService;
    }

    @GetMapping
    public List<Instructor> getAllInstructors() {
        return instructorService.getAllInstructors();
    }

    @GetMapping("/{id}")
    public Instructor getInstructorById(@PathVariable Long id) {
        return instructorService.getInstructorById(id);
    }

    @GetMapping("/{id}/events")
    public List<Event> getEventsByInstructorId(@PathVariable Long id) {
        return instructorService.getInstructorById(id).getEvents();
    }

    @PutMapping("/{id}")
    public Instructor updateInstructor(@PathVariable Long id, @RequestBody Instructor updatedInstructor) {
        return instructorService.updateInstructor(id, updatedInstructor);
    }

    @PostMapping
    public Instructor createInstructor(@RequestBody Instructor instructor) {
        return instructorService.saveInstructor(instructor);
    }

    @PutMapping("/{id}/events")
    public Instructor updateInstructorEvents(@PathVariable Long id, @RequestBody List<Event> updatedEvents) {
        return instructorService.updateInstructorEvents(id, updatedEvents);
    }

    @DeleteMapping("/{id}")
    public void deleteInstructor(@PathVariable Long id) {
        instructorService.deleteInstructor(id);
    }
}