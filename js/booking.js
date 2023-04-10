async function getClassrooms() {
    const options = {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
            Authorization: sessionStorage.getItem('Authorization'),
        },
        body: JSON.stringify({ status: ['available', 'unavailable'] }),
    };
    const response = await fetch('http://127.0.0.1:5000/classroom/findByStatus', options);
    if (!response.ok) {
        if (response.status === 401) {
            alert('You need to be logged in to view classrooms');
            return;
        }
    }
    const classroomContainer = document.querySelector('.classroom-container');
    const data = await response.json();
    data.forEach((classroom, index) => {
        if (index < data.length - 1) {
            const classroomElement = document.createElement('div');
            classroomElement.className = 'classroom';
            const classroomInfo = document.createElement('div');
            classroomInfo.className = 'classroom-info';
            const classroomName = document.createElement('p');
            classroomName.className = 'classroom-name';
            classroomName.textContent = `Classroom name: ${classroom.name}`;
            const classroomCapacity = document.createElement('p');
            classroomCapacity.className = 'classroom-capacity';
            classroomCapacity.textContent = `Capacity:${classroom.capacity}`;
            classroomInfo.appendChild(classroomName);
            classroomInfo.appendChild(classroomCapacity);
            const bookButton = document.createElement('button');
            bookButton.className = 'book-button';
            bookButton.textContent = 'Book';
            classroomElement.appendChild(classroomInfo);
            classroomElement.appendChild(bookButton);
            classroomContainer.appendChild(classroomElement);
        }
    });
}

getClassrooms();
