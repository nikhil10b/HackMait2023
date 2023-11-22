import smartpy as sp

class Lottery(sp.Contract):
    def _init_(self):
        self.init(
            players = sp.map(l={}, tkey=sp.TNat, tvalue=sp.TAddress),
            ticket_cost = sp.tez(2),
            max_tickets = sp.nat(5),
            tickets_available = sp.nat(5),
            operator = sp.test_account('admin').address
        )
        
    @sp.entry_point
    def buy_ticket(self):
        # Verify the following conditions before a ticket is bought

        # is the Operator buying the ticket (They Cannot)
        sp.verify(sp.sender != self.data.operator, message = "Operator cannot but tickets.")

        # does the buyer have enough tezos coins
        sp.verify(self.data.tickets_available > 0, message = 'No Tickets Available.')

        # are they putting in the right amount
        sp.verify(sp.amount >= self.data.ticket_cost, message = "Invalid Amount")
        
        self.data.players[sp.len(self.data.players)] = sp.sender
        self.data.tickets_available = sp.as_nat(self.data.tickets_available - 1) 
        
    @sp.entry_point
    def end_game(self, random_number):
        sp.set_type(random_number, sp.TNat)
        sp.verify(self.data.tickets_available == 0, message = 'Tickets still Available')
        sp.verify(sp.sender == self.data.operator, message = "Only operator can end game")

        # select the random winner
        winner_id = random_number % self.data.max_tickets

        # locate the winner in the players dictionary
        winner_address = self.data.players[winner_id]
        
        # send the price to the winner
        sp.send(winner_address, sp.balance - sp.tez(2))
        # send the operator his share of commission
        sp.send(self.data.operator, sp.tez(2))
        
        # reset the contract
        self.data.players = {}
        self.data.tickets_available = self.data.max_tickets


@sp.add_test(name='Lottery')
def test():
    scenario = sp.test_scenario()
    admin = sp.test_account('admin')
    anmol = sp.test_account('anmol')
    arnav = sp.test_account('arnav')
    harsh = sp.test_account('harsh')
    chirag = sp.test_account('chirag')
    chaitanya = sp.test_account('chaitanya')

# Contract instance
    lottery = Lottery()
    scenario += lottery

    scenario += lottery.buy_ticket().run(amount = sp.tez(2), sender = anmol)
    # scenario += lottery.end_game(67).run(sender=admin)