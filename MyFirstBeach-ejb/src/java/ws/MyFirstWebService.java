/*
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */
package ws;

import java.util.Iterator;
import java.util.List;
import javax.jws.WebService;
import javax.jws.WebMethod;
import javax.jws.WebParam;
import javax.ejb.Stateless;
import javax.persistence.*;
import oem.Customer;

/**
 *
 * @author Michi
 */
@WebService(serviceName = "MyFirstWebService")
@Stateless()
public class MyFirstWebService
{

    @PersistenceContext(unitName = "MyFirstBeach-ejbPU")
    private EntityManager em;

    @WebMethod(operationName = "hello")
    public String hello(@WebParam(name = "name") String txt)
    {
        return "Hello " + txt + " !";
    }

    @WebMethod(operationName = "findCustomerByFirstname")
    public String findCustomerByFirstname(@WebParam(name = "firstname") String firstname)
    {
        try
        {
            List<Customer> myCustomer
                    = em.createNamedQuery("Customer.findByFirstname")
                    .setParameter("firstname", firstname)
                    .getResultList();

            Iterator<Customer> iter = myCustomer.iterator();

            if (iter.hasNext())
            {
                Customer currCustomer = iter.next();
                return (currCustomer.getCustid() + " "
                        + currCustomer.getFirstname() + " "
                        + currCustomer.getLastname());
            } else
            {
                return "no result";
            }

        } catch (Exception e)
        {
            return e.getMessage();
        }

    }
    
    @WebMethod(operationName = "insertNewCustomer")
    public String insertNewCustomer(@WebParam(name = "firstname") String firstname, @WebParam(name = "lastname") String lastname, 
            @WebParam(name = "username") String username, @WebParam(name = "password") String password, 
            @WebParam(name = "email") String email)
    {
        Customer _Customer = new Customer();
        _Customer.setFirstname(firstname);
        _Customer.setLastname(lastname);
        _Customer.setUsername(username);
        _Customer.setPassword(password);
        _Customer.setEMail(email);
        em.persist(_Customer);
        return _Customer.getFirstname() + " " + _Customer.getLastname() + " was successfully added to the database!";
    }

}
