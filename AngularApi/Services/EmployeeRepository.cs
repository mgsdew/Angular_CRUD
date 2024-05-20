using AngularApi.Models;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;

namespace AngularApi.Services
{
    public class EmployeeRepository
    {
        private readonly ApplicationDbContext _context;

        public EmployeeRepository(ApplicationDbContext context)
        {
            _context = context;
        }

        public async Task AddEmployeeAsync(Employee model)
        {
            await _context.Set<Employee>().AddAsync(model);
            await _context.SaveChangesAsync();
        }

        public async Task UpdateEmployeeAsync(int id, Employee model)
        {
            var employee = await _context.Employees.FindAsync(id);
            if (employee == null)
            {
                throw new Exception("No record found!");    
            }

            employee.Name = model.Name;
            employee.Email = model.Email;
            employee.Phone = model.Phone;
            employee.Age = model.Age;
            employee.Salary = model.Salary;

            await _context.SaveChangesAsync();
        }

        public async Task<List<Employee>> GetAllEmployeesAsync()
        {
            return await _context.Employees.ToListAsync();
        }

        public async Task<Employee> GetEmployeeById(int id)
        {
            var employee = await _context.Employees.FindAsync(id);
            return employee;
        }

        public async Task<Employee> GetEmplaoyeeByEmail(string email)
        {
            return await _context.Employees.Where(x => x.Email == email).FirstOrDefaultAsync();
        }

        public async Task DeleteEmployee(int id)
        {
            var employee = await _context.Employees.FindAsync(id);
            if (employee == null)
            {
                throw new Exception("No Employee record found by this Id : {"+ id +"}");
            }

            _context.Employees.Remove(employee);
            await _context.SaveChangesAsync();
        }

    }
}
