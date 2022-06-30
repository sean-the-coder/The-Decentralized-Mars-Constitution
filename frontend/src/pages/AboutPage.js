import React from "react";

const AboutPage = () => {
  return (
    <div class="container">
      <div className="App">
        <h3>The Decentralized Mars Constitution (DMC) Whitepaper</h3>
        <header class="text-left">
          <h4>Introduction:</h4>
          <p>
            <b>Abstract: </b>Scientists predict that the first humans will
            arrive on Mars between 2024 and 2026 and an early settlement could
            be established by 2050. What type of political system should there
            be for an early civilization on Mars? A government modeled after
            modern day democracies would experience far too many inefficiencies
            and would not be scalable for a colony. Instead a novel approach
            toward government must be developed to provide a Martian
            civilization with a dependable and sustainable form of government.
            We propose a direct democracy in which every Mars citizen will be
            participants in a DAO (decentralized autonomous organization) that
            provides the rules, laws, and structure for the rapidly evolving
            government. As citizens deliberate, propose, and vote a series of
            laws will be created forming the Decentralized Mars Constitution
            (DMC).
          </p>
          <br></br>
          <p>
            <b>Rationale and Utility:</b> We choose to develop a DAO for a
            future Mars colony for two main reasons: the possible applicability
            of the DAO and planning for the future. A direct democracy DAO where
            the rules and laws are chartered by the members has many use cases
            for new organizations. This DAO could provide the framework for any
            newly founded organization to establish their own government. Since
            this project is open source and transparent, other developers can
            easily alter rules and code of our project to fit their needs.
            Additionally, by planning for the future this DAO allows us to
            consider and contemplate future problems of advancing science and
            technology and propose novel solutions. We can solve them now to
            avoid any issues with them in the future.
          </p>
          <h4>Policy Making:</h4>
          <p>
            <b>Fundamentals of the Laws: </b> The laws follow simple rules:
            <ul>
              <li>
                All laws exist as a single source of truth on the blockchain.
              </li>
              <li>The laws are clear and understandable.</li>
              <li>
                The laws are transparent; all citizens have easy access to all
                the laws.
              </li>
              <li>
                All laws have a set life period and after they expire they are
                voted on again
              </li>
            </ul>
          </p>
          <br></br>
          <p>
            <b>Individuals Citizens:</b>Once on Mars every person is given a
            decentralized identifier (DID) that contains personal information
            and attributes of the person (discussed later in Registering
            Citizens). Every citizen can propose a law. Every citizen can vote
            on the law. Every citizen can view the existing laws. Although this
            government is considered a direct democracy, we have implemented a
            weighted voting system such that people with specific attributes
            that directly pertain to the law will have a greater vote. When a
            citizen proposes a new law they are forking the DMC and appending
            their new proposal.
          </p>
          <br />
          <p>
            <b>Legislative Process:</b> Using the frontend interface or calling
            the smart contract directly a citizen can propose a law. Before this
            law is visible and the process of voting begins on the proposed law,
            the law must receive backing from other citizens in the DAO.
            Citizens communicate through a Discord server and can advocate for
            their proposed law. The law is comprised of three parts:
            <ol>
              <li>
                The law to be proposed (built into the existing framework of
                DMC) described in as few words as possible with a ‘sunsetting’
                window (i.e. time after which it will expire unless renewed
                after acceptance)
              </li>
              <li>
                Proposed weightage of the most important Skills/Attributes to
                allow weighted voting for citizens
              </li>
              <li>
                Explanations/References/Additional Elaboration on the proposal
                to help sell it to individuals (stored on an off chain server).
              </li>
            </ol>
            Each law has a one week voting period and each citizen gets one
            vote. A citizen can delegate their vote to another citizen if they
            choose to do so. If a law receives greater than half of the votes it
            gets published in the DMC. Otherwise it gets published as an
            unsuccessful proposal and is not part of the DMC.
          </p>
          <br />
          <h4>Functions of the DAO:</h4>
          <p>
            <b>Registering Citizens: </b>Once an individual arrives on Mars they
            receive a decentralized identifier (DID), get put into a citizen
            registry, and receive Mars Colony Coin (the governance token of the
            DAO). Citizens are stored in a mapping in which the key is their ID
            number (a unique number that represents the order of arrival on
            Mars) and the value is a struct that contains personal information
            and attributes. Personal information includes name, age, date of
            birth. Their attributes include up to three areas in which they have
            some type of expertise. Since this information is public it can be
            challenged by other citizens if they deem the self reported
            attributes are not valid. Their DID is their unique identifier which
            proves their identity and is used for all transactions in the DAO.
          </p>
          <br></br>
          <p>
            <b>Providing Governmental Structure and Actions:</b> The DAO
            contains an underlying structure such that citizens can easily
            participate. Every citizen has access to a frontend web application
            that directly interacts with the underlying smart contracts. Within
            the frontend users can easily see the DCM, proposed laws to vote on,
            and laws that need backing. Additionally, in this interface they can
            easily propose their own laws.
          </p>
          <br />
          <p>
            <b>Managing the Coin:</b> The governance token of the DAO is called
            the Mars Colony Coin (MCC). The main purpose of the coin is to
            incentivize and balance citizens' roles in the DAO. Upon
            registration, a citizen receives X MCC. MCC represents how involved
            a citizen is with the DAO. The coin can be earned by participating
            in the economy through voting. When proposing a law, a set amount of
            coin is attached to the law. The more coin attached the higher
            visibility it will receive for other citizens in the frontend web
            application.
          </p>
          <h4>Design of the DAO:</h4>
          <p>
            <b>Smart Contracts: </b>The DAO is composed of the following smart
            contracts:
            <ul>
              <li>
                User Registry Contract: The user registry contract manages the
                citizens of the Mars Colony. It includes a function to register
                citizens with a struct for each citizen. The struct has
                variables for the id number (the number of arrival, which is
                unique), name, and date of birth. There is a mapping of uint to
                address. The uint is the id number and the address is the
                address to their ethereum wallet. When making a transaction,
                they pass in their id number and it needs to match the
                msg.sender.{" "}
              </li>
              <li>
                Main DMC Contract: This contract contains all the established
                laws of the DMC. Storing strings on the Ethereum Blockchain has
                high gas costs, so the laws will be stored on the InterPlanetary
                File System (IPFS). Each law is a struct consisting of a unique
                uint (representing the number of the law) and the hash of the
                string from IPFS. There is a uint representing the total number
                of laws and a function which takes in a uint parameter and
                returns the corresponding law.
              </li>
              <li>
                Citizen Interface: Citizens have specific actions they need to
                perform and information that needs to be readily viewable. This
                smart contract includes functions which return hashes of the
                laws from IPFS to be displayed on the frontend webapp.
              </li>
              <li>
                Coin: The Mars Colony Coin is a ERC20 token. Starts with an
                initial balance of Y and is sent to citizens once they register.
                If balance dips below Z more tokens are created. Tokens are
                spent when a citizen proposes a law. Tokens are sent to citizens
                when citizens vote on the law.
              </li>
            </ul>
          </p>
          <br></br>
          <p>
            <b>InterPlanetary File System: </b>Storing large strings on the
            Ethereum Blockchain has high gas costs so all strings representing
            laws will be stored on IPFS.
          </p>
          <br />
          <p>
            <b>Discord Server: </b>Communication is crucial for DAOs. Citizens
            should be able to have an open discussion on laws and the formation
            of the government. We have a created a Discord server for this
            reason which all citizens can join.
          </p>
        </header>
      </div>
    </div>
  );
};

export default AboutPage;
