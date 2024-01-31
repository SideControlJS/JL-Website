// Example JavaScript to dynamically showcase skills
document.addEventListener('DOMContentLoaded', function() {
    var skills = ['HTML5', 'CSS3', 'JavaScript', 'Responsive Design', 'React', 'Node.js'];
    var skillsList = document.getElementById('skills-list');

    skills.forEach(function(skill) {
        var skillItem = document.createElement('div');
        skillItem.className = 'skill';
        skillItem.textContent = skill;
        skillsList.appendChild(skillItem);
    });
});
