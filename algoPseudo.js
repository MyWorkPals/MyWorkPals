/**
 * NASTI's instructions + some extra thoughts
 *
 * Here are stuff that we need to set ah,
 * 1. how many shifts
 * 2. the duration of each shift
 * 3. number of each role in each shift (a person can have one role or multiple roles)
 * 4. restrictions in the form of options (number of off days a week, number of night shifts in a row, number of shifts in a row)
 * 5. each person availiability (if cannot come for the day then dont put them)
 *
 * we need to consolidate all the dates they are available and the roles they have and sort them in this order
 * 1. dates available (this is the basic list)
 * 2. number of roles (most little roles they can do will be put first at the front of the list)
 * 3. number of dates unavailable (this one if they are unavailable alot, then you want to put them more front oso becus other people can fill up the slots)
 *
 * Now that the sorting is done, we can start to create the schedule. Start to allocate in this order of the filtered / ordered list
 * 1. low roles, low availability put first in all the days
 * 2. low roles, high availability fill up
 * 3. high roles fill up
 * 4. manager fill up
 *
 * Ensure that there are checks constantly done after every iteration,
 * every worker cannot work more than 5 days a week,
 * and 2 shifts a day.How I did this is I have a shift and days tracker for each person.
 * Even if they meet the requirements, i will run check on the number then if can then add, cannot then next person
 *
 * I think fairness is also very important, everyone should have a roughly equal number of shifts to do
 * We can calculate that in terms of total number of roles across all working days divided by the number of employees
 * Also I forsee some issues with certain roles like some cafes hire part time chefs and not everyone can be the chef
 * whereas some jobs like waiter or cashier almost everyone can do
 * using the brute force method might end up with some roles in some shifts empty, we need to decide on what to do with those roles.
 * I think a nice ui for the manager to fill up by themselves would be great and we can make suggestions on who should fill that role
 */

/**
 * Here is the method of storing data that I am proposing.
 *
 * We can store this in a templates collection where each entry will have the template and the manager id tied to it
 * Each manager entry will also have a list of user ids for the employees
 * {
 *   Template: {
 *     Monday: {
 *       shift0: {
 *         start: Date (Javascript Date type),
 *         end: Date (Javascript Date type),
 *         rolesNeeded: {
 *           'cashier': 1,
 *           'waiter': 2,
 *           'chef': 1,
 *         }
 *       },
 *       shift1: { ... },
 *       ...
 *     },
 *     Tuesday: { ... },
 *     Thursday: { ... },
 *     Friday: { ... },
 *   },
 *   like here is extra info or something: {}
 * };
 * Maybe inside here can put other info like how many tasks in total or something
 * so we dont have to recalculate it everytime we wanna check if they have done enough lel
 *
 *
 * Whereas the employees availability will look something like this.
 * Each persons JSON can also contain their skills
 * {
 *   'Clevon': {
 *      availability: {
 *        "Tuesday": {
 *          start: Date (Javascript Date type),
 *          end: Date (Javascript Date type),
 *        },
 *        "Wednesday": {
 *          start: Date (Javascript Date type),
 *          end: Date (Javascript Date type),
 *        },
 *      },
 *      skills: [cashier, waiter, cleaner, ...]
 *    },
 *   'Nasti': {...},
 *   'Nelson': {...},
 * }
 */

/**
 * so according to what nasti has said right we have to sort the humans first
 * to know what order we want to insert the employees into the weekly schedule
 * there are 2 sorting requirements:
 *  1. by their availability
 *  2. by their roles
 * those with lesser availability and roles should be inserted first
 * in the event there is someone that can do everything and is free all week
 * so that our algo doesnt put that one idiot into every available role and task
 * we will be measuring their availability and their roles by counting the number of shifts they are free and counting how many roles they can fill
 *
 * the issue though is that since this is a JSON, elements of the JSON cannot be accessed via index
 * hence we wont be able to sort it or have a sorted JSON since its a collection
 * and that means there is no order to it (its a hashtable)
 *
 * there are a few ways to go about doing this:
 *  1. store it in an array like so
 *    var obj = [
 *        {"key":"set1", "data":[1, 2, 3]},
 *        {"key":"set2", "data":[4, 5, 6, 7, 8]},
 *        {"key":"set3", "data":[9, 10, 11, 12]}
 *    ];
 *  2. everytime we want to access something via index we do Object.keys() or Object.values()
 *    a. but this will still leave the JSON unordered
 *    b. and also those 2 functions have O(n) runtime, although not that bad but if we keep doing that multiple times for each person while sorting, the overall runtime will be horrendous lmao
 *  3. lastly we can just build an array at the start before sorting which will take O(n) once
 *    like this:
 *      var obj = {
 *          "set1": [1, 2, 3],
 *          "set2": [4, 5, 6, 7, 8],
 *          "set3": [9, 10, 11, 12]
 *      };
 *
 *      var index = [];
 *
 *      // build the index
 *      for (var x in obj) {
 *        index.push(x);
 *      }
 *
 *      // sort the index
 *        index.sort(function (a, b) {
 *          return a == b ? 0 : (a > b ? 1 : -1);
 *      });
 *    then we can do something like this console.log(obj[index[1]]);
 *
 * option 1 seems the easiest to use to sort i think but building it from the backend might not
 * i will leave it to yall to decide
 *
 * this is how we are going to sort it:
 * i think we should either do mergesort or quicksort ( i think quicksort is the fastest right )
 * since we all know how to implement it i shall not write the pseudo code
 * the only thing what we going to use to compare 2 people because we have 2 criterias
 * we can either do:
 *  if (less roles) return -1
 *  if (more roles) return 1
 *  if (less availabe) return -1
 *  if (more available) return 1
 *  return 0           (this will prioritise roles and if the number of roles are equal we check availability, if availability also equal, they are the same)
 * or we can just hard code the conditions like less avai && less roles then more avai && less roles....
 */

/** Then the last issue would be inserting the employees into the shifts and their tasks
 * since we have the employees in an array, we will iterate through the employees
 * then each iteration of the employees we will iterate through the days
 * then check the shift for the day and check the role for the shift AND check if got hit any other contraints
 * like if work more than 5 days or back to back or hit more than the average
 * those can terminate the loops early to reduce actual runtime
 *
 * day = template[0]  // means we need to have an order here also
 * for each employee {
 *    while (all ur checks above) {
 *        add him into the schedule
 *        day = template[++]
 *    }
 *    break
 * }
 */

function pseudo() {}
