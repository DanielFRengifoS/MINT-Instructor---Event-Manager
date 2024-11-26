package MINT.service;

import MINT.model.Event;
import MINT.model.Instructor;
import MINT.repository.EventRepository;
import MINT.repository.InstructorRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import java.util.List;

@Service
public class InstructorService {
    private final InstructorRepository instructorRepository;
    private final EventRepository eventRepository;

    @Autowired
    public InstructorService(InstructorRepository instructorRepository, EventRepository eventRepository) {
        this.instructorRepository = instructorRepository;
        this.eventRepository = eventRepository;
    }

    public List<Instructor> getAllInstructors() {
        return instructorRepository.findAll();
    }

    public Instructor getInstructorById(Long id) {
        return instructorRepository.findById(id).orElseThrow(() -> new RuntimeException("Instructor not found"));
    }

    public Instructor saveInstructor(Instructor instructor) {
        return instructorRepository.save(instructor);
    }

    public Instructor updateInstructor(Long id, Instructor updatedInstructor) {
        Instructor existingInstructor = instructorRepository.findById(id)
                .orElseThrow(() -> new RuntimeException("Instructor not found"));

        existingInstructor.setFirstName(updatedInstructor.getFirstName());
        existingInstructor.setLastName(updatedInstructor.getLastName());
        existingInstructor.setBirthday(updatedInstructor.getBirthday());
        existingInstructor.setEvents(updatedInstructor.getEvents());

        return instructorRepository.save(existingInstructor);
    }

    public Instructor updateInstructorEvents(Long id, List<Event> updatedEvents) {
        Instructor existingInstructor = instructorRepository.findById(id).orElseThrow(() -> new RuntimeException("Instructor not found"));
        for(Event ev : existingInstructor.getEvents()) {

            System.out.println("ScRiPt");
            System.out.println(ev.getDescription()+ev.getType());
            if(ev.getId() != null) {
                System.out.println(ev.getId());
                ev.setInstructor(null);
                ev.setDescription("");
                eventRepository.deleteById(ev.getId());
            }
        }
        for(Event ev : updatedEvents) {
            System.out.println("PRiNt");
            System.out.println(ev.getDescription()+ev.getType());
            ev.setInstructor(existingInstructor);
            eventRepository.save(ev);
        }
        existingInstructor.setEvents(updatedEvents);
        System.out.println(existingInstructor.getEvents());
        return instructorRepository.save(existingInstructor);
    }

    public void deleteInstructor(Long id) {
        instructorRepository.deleteById(id);
    }
}