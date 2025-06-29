const studyGuideData = {
    "1.1 Compare and contrast various types of security controls.": `
        <h4>Study Guide: 1.1 Compare and contrast various types of security controls.</h4>
        <p>Security controls are measures taken to protect information and assets. They can be categorized by their nature (Technical, Managerial, Operational, Physical) or by their function (Preventive, Deterrent, etc.).</p>
        <h5>Controls by Nature:</h5>
        <ul>
            <li><strong>Technical Security Controls:</strong> Implemented through technology, often hardware or software-based. Examples: Firewalls, encryption, intrusion detection systems, and access controls.</li>
            <li><strong>Managerial Security Controls:</strong> Involve strategies, governance, and the organizational approach to security, ensuring policies and procedures are in place. Examples: Risk assessments, security policies, security training programs, and vendor management.</li>
            <li><strong>Operational Security Controls:</strong> Focused on day-to-day tasks and procedures followed by users or administrators. Examples: Backup and recovery procedures, incident response, and change management.</li>
            <li><strong>Physical Security Controls:</strong> Designed to protect the physical environment of information assets. Examples: Security guards, fences, locks, CCTV, biometric access, and fire suppression systems.</li>
        </ul>
        <h5>Controls by Functionality:</h5>
        <ul>
            <li><strong>Preventive Controls:</strong> Aim to stop an incident before it happens. Examples: Firewalls, access controls, strong password policies, and encryption.</li>
            <li><strong>Deterrent Controls:</strong> Discourage attackers by increasing risk or reducing reward. Examples: Warning banners, visible surveillance cameras, and account lockout warnings.</li>
            <li><strong>Detective Controls:</strong> Designed to discover unauthorized activity. Examples: Intrusion detection systems (IDS), audit logs, and SIEM systems.</li>
            <li><strong>Corrective Controls:</strong> Aim to limit damage and correct the situation after an incident. Examples: Antivirus software that quarantines malware, incident response teams, and backup/restoration tools.</li>
            <li><strong>Compensating Controls:</strong> Provide alternative measures when primary controls are not feasible. Example: Using a stringent password policy and user behavior monitoring when multifactor authentication cannot be supported.</li>
            <li><strong>Directive Controls:</strong> Guide user actions through stipulated mandatory or recommended actions. Examples: Acceptable use policies, security policies, and guidelines.</li>
        </ul>
    `,
    "1.2 Summarize these fundamental security concepts:": `
        <h4>Study Guide: 1.2 Summarize these fundamental security concepts:</h4>
        <h5>CIA Triad:</h5>
        <ul>
            <li><strong>Confidentiality:</strong> Ensures data is accessed only by authorized individuals.</li>
            <li><strong>Integrity:</strong> Ensures data remains accurate and unaltered by unauthorized entities.</li>
            <li><strong>Availability:</strong> Ensures data and systems are accessible when needed.</li>
            <li><strong>Non-repudiation:</strong> Guarantees a sender cannot deny sending information and a receiver cannot deny receiving it.</li>
        </ul>
        <h5>AAA (Authentication, Authorization, and Accounting):</h5>
        <ul>
            <li><strong>Authentication:</strong> Verifying the identity of users or systems.</li>
            <li><strong>Authorization:</strong> Defining permissions for what authenticated users are allowed to do.</li>
            <li><strong>Accounting:</strong> Tracking user activities.</li>
        </ul>
        <h5>Other Concepts:</h5>
        <ul>
            <li><strong>Gap Analysis:</strong> A process to identify the differences between current security practices and desired standards.</li>
            <li><strong>Zero Trust:</strong> An access control model based on policy and dynamic identity verification, with a Control Plane (policy decisions) and a Data Plane (policy enforcement).</li>
            <li><strong>Physical Security:</strong> Includes barriers (bollards, fences), access control (vestibules, guards), surveillance (CCTV), and sensors (infrared, pressure).</li>
            <li><strong>Deception and Disruption Technology:</strong> Includes Honeypots (decoy systems), Honeynets (decoy networks), Honeyfiles (decoy files), and Honeytokens (decoy data).</li>
        </ul>
    `,
    "1.3 Explain the importance of change management processes and the impact to security.": `
        <h4>Study Guide: 1.3 Explain the importance of change management processes and the impact to security.</h4>
        <p>Change management ensures that modifications are conducted in a structured and secure manner.</p>
        <h5>Business Processes Impacting Security:</h5>
        <ul>
            <li><strong>Approval Process:</strong> Ensures only vetted changes are implemented.</li>
            <li><strong>Impact Analysis:</strong> Evaluates potential security risks of a change.</li>
            <li><strong>Backout Plan:</strong> A plan to revert changes if unforeseen vulnerabilities arise.</li>
            <li><strong>Maintenance Window:</strong> Designated times for changes to reduce disruptions.</li>
        </ul>
        <h5>Technical Implications:</h5>
        <ul>
            <li><strong>Allow/Deny Lists:</strong> Changes may require updating lists that permit or prohibit activities.</li>
            <li><strong>Dependencies:</strong> Changes can affect dependent systems, creating security gaps.</li>
        </ul>
        <h5>Documentation and Version Control:</h5>
        <ul>
            <li><strong>Documentation:</strong> Updating diagrams and policies ensures teams have current information.</li>
            <li><strong>Version Control:</strong> Tracks modifications, which is critical for security forensics.</li>
        </ul>
    `,
    "1.4 Explain the importance of using appropriate cryptographic solutions.": `
        <h4>Study Guide: 1.4 Explain the importance of using appropriate cryptographic solutions.</h4>
        <p>Cryptography is essential for data confidentiality, integrity, and authenticity.</p>
        <h5>Public Key Infrastructure (PKI):</h5>
        <ul>
            <li><strong>Public/Private Key:</strong> Secures communication; a public key encrypts, and only the corresponding private key can decrypt.</li>
            <li><strong>Key Escrow:</strong> A trusted third party holds keys for recovery.</li>
        </ul>
        <h5>Encryption & Tools:</h5>
        <ul>
            <li><strong>Levels:</strong> Can be applied at the full-disk, partition, volume, file, or database level.</li>
            <li><strong>Tools:</strong> TPM (Trusted Platform Module), HSM (Hardware Security Module), Secure Enclave.</li>
        </ul>
        <h5>Obfuscation:</h5>
        <ul>
            <li><strong>Steganography:</strong> Hiding data within other data.</li>
            <li><strong>Tokenization:</strong> Replacing sensitive data with non-sensitive placeholders.</li>
            <li><strong>Data Masking:</strong> Concealing specific data.</li>
        </ul>
        <h5>Hashing, Salting, and Digital Signatures:</h5>
        <ul>
            <li><strong>Hashing:</strong> Converts data into a fixed-size string to ensure integrity.</li>
            <li><strong>Salting:</strong> Adds random data before hashing to ensure unique outputs.</li>
            <li><strong>Digital Signatures:</strong> Confirms the authenticity of a digital message.</li>
        </ul>
        <h5>Certificates:</h5>
        <ul>
            <li><strong>CA (Certificate Authority):</strong> Issues digital certificates.</li>
            <li><strong>CRL/OCSP:</strong> Used to check if a certificate has been revoked.</li>
        </ul>
    `,
    "2.1 Compare and contrast common threat actors and motivations.": `
        <h4>Study Guide: 2.1 Compare and contrast common threat actors and motivations.</h4>
        <h5>Threat Actors:</h5>
        <ul>
            <li><strong>Nation-State:</strong> Government-backed entities engaging in cyber activities for espionage or war.</li>
            <li><strong>Unskilled Attacker (Script Kiddie):</strong> Individuals with limited skills using pre-made tools.</li>
            <li><strong>Hacktivist:</strong> Motivated by political or social causes.</li>
            <li><strong>Insider Threat:</strong> Employees or contractors who misuse their authorized access.</li>
            <li><strong>Organized Crime:</strong> Groups engaged in cybercrime for financial gain.</li>
            <li><strong>Shadow IT:</strong> Unauthorized applications or systems used within an organization.</li>
        </ul>
        <h5>Motivations:</h5>
        <ul>
            <li><strong>Financial Gain:</strong> Common for organized crime.</li>
            <li><strong>Espionage:</strong> Common for nation-states.</li>
            <li><strong>Philosophical/Political Beliefs:</strong> Drives hacktivists.</li>
            <li><strong>Revenge/Disruption:</strong> Targeting an entity out of vengeance or a desire to create chaos.</li>
        </ul>
    `,
    "2.2 Explain common threat vectors and attack surfaces.": `
        <h4>Study Guide: 2.2 Explain common threat vectors and attack surfaces.</h4>
        <p>Threat vectors are the methods adversaries use to target organizations.</p>
        <ul>
            <li><strong>Message-based:</strong> Email, SMS (Smishing), and IM can deliver malicious content.</li>
            <li><strong>Voice Call:</strong> Vishing (voice phishing) uses phone calls to deceive victims.</li>
            <li><strong>Removable Devices:</strong> USBs can introduce malware.</li>
            <li><strong>Unsecure Networks:</strong> Interception can occur on unsecured Wi-Fi.</li>
            <li><strong>Default Credentials:</strong> Unchanged default passwords are easily exploited.</li>
            <li><strong>Supply Chain:</strong> A compromise at a vendor can create a gateway into an organization.</li>
            <li><strong>Human Vectors / Social Engineering:</strong> Phishing, Impersonation, Business Email Compromise (BEC), Watering Hole attacks.</li>
        </ul>
    `,
    "2.3 Explain various types of vulnerabilities.": `
        <h4>Study Guide: 2.3 Explain various types of vulnerabilities.</h4>
        <p>A vulnerability is a weakness in a system or process that a threat actor can exploit.</p>
        <h5>Application Vulnerabilities:</h5>
        <ul>
            <li><strong>Memory Injection/Buffer Overflow:</strong> Introducing malicious code into memory or exceeding a buffer's capacity.</li>
            <li><strong>Race Conditions:</strong> System behavior depends on the uncontrollable timing of events.</li>
        </ul>
        <h5>Web-based Vulnerabilities:</h5>
        <ul>
            <li><strong>SQL Injection (SQLi):</strong> Inserting malicious SQL code into input fields.</li>
            <li><strong>Cross-site Scripting (XSS):</strong> Injecting malicious scripts into websites.</li>
        </ul>
        <h5>Other Vulnerabilities:</h5>
        <ul>
            <li><strong>Hardware Vulnerabilities:</strong> End-of-life/legacy hardware with unpatched flaws.</li>
            <li><strong>Virtualization Vulnerabilities:</strong> VM Escape allows an attacker to break out of a VM.</li>
            <li><strong>Supply Chain Vulnerabilities:</strong> Weaknesses introduced by third parties.</li>
            <li><strong>Zero-day Vulnerabilities:</strong> Previously unknown vulnerabilities.</li>
        </ul>
    `,
    "2.4 Given a scenario, analyze indicators of malicious activity.": `
        <h4>Study Guide: 2.4 Given a scenario, analyze indicators of malicious activity.</h4>
        <p>Indicators suggest an attack has occurred or is in progress.</p>
        <h5>Malware Indicators:</h5>
        <ul>
            <li><strong>Ransomware:</strong> Sudden file encryption and a ransom note.</li>
            <li><strong>Spyware:</strong> Unauthorized data transmission.</li>
            <li><strong>Rootkit:</strong> Undetectable malware providing deep system control.</li>
        </ul>
        <h5>Attack Indicators:</h5>
        <ul>
            <li><strong>DDoS:</strong> A large amount of traffic from numerous sources.</li>
            <li><strong>Privilege Escalation:</strong> A lower-level user gaining higher-level access.</li>
            <li><strong>Password Spraying:</strong> Multiple login attempts using common passwords across many accounts.</li>
            <li><strong>Impossible Travel:</strong> Logins from geographically distant locations in a short time.</li>
            <li><strong>Unusual Resource Consumption:</strong> High CPU, memory, or bandwidth usage.</li>
            <li><strong>Missing Logs:</strong> Evidence that logs have been deleted or altered.</li>
        </ul>
    `,
    "2.5 Explain the purpose of mitigation techniques used to secure the enterprise.": `
        <h4>Study Guide: 2.5 Explain the purpose of mitigation techniques used to secure the enterprise.</h4>
        <p>These techniques aim to minimize risk, reduce the attack surface, and detect and respond to threats.</p>
        <ul>
            <li><strong>Segmentation:</strong> Dividing a network into smaller segments to isolate data.</li>
            <li><strong>Access Control:</strong> Using ACLs and permissions to define access.</li>
            <li><strong>Application Allow List:</strong> Specifying which applications are allowed to run.</li>
            <li><strong>Isolation:</strong> Separating processes or systems.</li>
            <li><strong>Patching:</strong> Regularly updating software to fix vulnerabilities.</li>
            <li><strong>Encryption:</strong> Encoding data to ensure it remains unreadable.</li>
            <li><strong>Least Privilege:</strong> Granting users only the permissions they need.</li>
            <li><strong>Configuration Enforcement:</strong> Ensuring systems are set up according to security policies.</li>
            <li><strong>Hardening:</strong> Disabling unnecessary ports, changing default passwords, removing unneeded software.</li>
        </ul>
    `,
    "3.1 Compare and contrast security implications of different architecture models.": `
        <h4>Study Guide: 3.1 Compare and contrast security implications of different architecture models.</h4>
        <ul>
            <li><strong>Cloud vs. On-premises:</strong> Cloud involves a shared responsibility model, while on-premises gives full control and full responsibility.</li>
            <li><strong>Infrastructure as Code (IaC):</strong> Automation can speed up deployment but can also rapidly propagate errors.</li>
            <li><strong>Microservices:</strong> Isolation of services can limit breach scope, but inter-service communication can add vulnerabilities.</li>
            <li><strong>Containerization:</strong> Provides lightweight, isolated environments but can have container-specific vulnerabilities.</li>
            <li><strong>Virtualization:</strong> Efficient but a hypervisor vulnerability can impact multiple VMs.</li>
            <li><strong>IoT, ICS/SCADA, Embedded Systems:</strong> Often expand the attack surface with devices that are difficult to patch.</li>
        </ul>
    `,
    "3.2 Given a scenario, apply security principles to secure enterprise infrastructure.": `
        <h4>Study Guide: 3.2 Given a scenario, apply security principles to secure enterprise infrastructure.</h4>
        <h5>Device Placement and Security Zones:</h5>
        <ul>
            <li>Place critical devices in secure, monitored locations.</li>
            <li>Use security zones like a DMZ to segregate public-facing services.</li>
        </ul>
        <h5>Failure Modes:</h5>
        <ul>
            <li><strong>Fail-open:</strong> Defaults to allowing traffic if a security device fails (prioritizes availability).</li>
            <li><strong>Fail-closed:</strong> Defaults to blocking traffic if a device fails (prioritizes security).</li>
        </ul>
        <h5>Network Appliances:</h5>
        <ul>
            <li><strong>Jump Server:</strong> A secure intermediate host for managing access.</li>
            <li><strong>Proxy Server:</strong> Filters and monitors web requests.</li>
            <li><strong>IPS/IDS:</strong> Monitors and/or blocks malicious network activities.</li>
            <li><strong>WAF (Web Application Firewall):</strong> Protects web applications.</li>
            <li><strong>NGFW (Next-Generation Firewall):</strong> Performs deep-packet inspection.</li>
        </ul>
        <h5>Secure Communication:</h5>
        <ul>
            <li><strong>VPN:</strong> Encrypts connections for remote users.</li>
            <li><strong>Tunneling:</strong> Using protocols like TLS or IPSec to secure communications.</li>
        </ul>
    `,
    "3.3 Compare and contrast concepts and strategies to protect data.": `
        <h4>Study Guide: 3.3 Compare and contrast concepts and strategies to protect data.</h4>
        <h5>Data States & Sovereignty:</h5>
        <ul>
            <li><strong>Data at rest:</strong> Stored data.</li>
            <li><strong>Data in transit:</strong> Data being transferred.</li>
            <li><strong>Data in use:</strong> Data being actively processed.</li>
            <li><strong>Data Sovereignty:</strong> Data is subject to the laws of the country where it is located.</li>
        </ul>
        <h5>Methods to Secure Data:</h5>
        <ul>
            <li><strong>Encryption:</strong> Converting data into code.</li>
            <li><strong>Hashing:</strong> Creating a one-way fingerprint of data.</li>
            <li><strong>Masking:</strong> Replacing data with modified content.</li>
            <li><strong>Tokenization:</strong> Replacing sensitive data with a non-sensitive substitute.</li>
            <li><strong>Segmentation:</strong> Dividing a network to improve security.</li>
            <li><strong>Permission Restrictions:</strong> Defining who can access data.</li>
        </ul>
    `,
    "3.4 Explain the importance of resilience and recovery in security architecture.": `
        <h4>Study Guide: 3.4 Explain the importance of resilience and recovery in security architecture.</h4>
        <p>Resilience ensures systems can withstand adverse events, while recovery ensures they can be restored.</p>
        <h5>High Availability:</h5>
        <ul>
            <li><strong>Load Balancing:</strong> Distributing traffic across multiple servers.</li>
            <li><strong>Clustering:</strong> Linking servers so if one fails, others can take over.</li>
        </ul>
        <h5>Site Considerations:</h5>
        <ul>
            <li><strong>Hot Site:</strong> A fully equipped and mirrored site ready for immediate takeover.</li>
            <li><strong>Cold Site:</strong> Basic infrastructure with no current data.</li>
            <li><strong>Warm Site:</strong> A middle ground with essential hardware and data.</li>
            <li><strong>Geographic Dispersion:</strong> Spreading sites out geographically.</li>
        </ul>
        <h5>Backups & Power:</h5>
        <ul>
            <li><strong>Backups:</strong> Should be encrypted and taken regularly. Snapshots capture a system's state.</li>
            <li><strong>Power:</strong> UPS for short-term outages, generators for extended outages.</li>
        </ul>
    `,
    "4.1 Given a scenario, apply common security techniques to computing resources.": `
        <h4>Study Guide: 4.1 Given a scenario, apply common security techniques to computing resources.</h4>
        <ul>
            <li><strong>Secure Baselines:</strong> Standardized configurations that define the desired security posture for a system.</li>
            <li><strong>Hardening:</strong> Reinforcing systems by disabling unused ports, changing defaults, and removing unneeded software.</li>
            <li><strong>Mobile Solutions (MDM):</strong> Manage and secure employee devices (BYOD, COPE, CYOD).</li>
            <li><strong>Wireless Security:</strong> Use WPA3 and AAA/RADIUS for authentication.</li>
            <li><strong>Application Security:</strong> Use Input Validation, Static Code Analysis, and Sandboxing.</li>
        </ul>
    `,
    "4.2 Explain the security implications of proper hardware, software, and data asset management.": `
        <h4>Study Guide: 4.2 Explain the security implications of proper hardware, software, and data asset management.</h4>
        <p>Each phase of an asset's life cycle has security considerations.</p>
        <ul>
            <li><strong>Acquisition:</strong> Purchase from reputable vendors.</li>
            <li><strong>Assignment:</strong> Assign a responsible owner for each asset.</li>
            <li><strong>Monitoring:</strong> Maintain a current inventory to identify unauthorized devices.</li>
            <li><strong>Disposal:</strong> Securely sanitize or destroy all data on assets before disposal.</li>
            <li><strong>Data Retention:</strong> Have a policy to systematically destroy data when no longer needed.</li>
        </ul>
    `,
    "4.3 Explain various activities associated with vulnerability management.": `
        <h4>Study Guide: 4.3 Explain various activities associated with vulnerability management.</h4>
        <p>Vulnerability management is the continuous process of identifying, evaluating, treating, and reporting on vulnerabilities.</p>
        <h5>Identification & Analysis:</h5>
        <ul>
            <li><strong>Vulnerability Scan:</strong> Automated tools scan for known vulnerabilities.</li>
            <li><strong>Penetration Testing:</strong> A simulated attack to uncover vulnerabilities.</li>
            <li><strong>Bug Bounty Program:</strong> Compensating individuals for reporting bugs.</li>
            <li><strong>Analysis:</strong> Distinguishing true threats from false positives and prioritizing using CVSS.</li>
        </ul>
        <h5>Response and Remediation:</h5>
        <ul>
            <li><strong>Patching:</strong> Applying updates to fix the vulnerability.</li>
            <li><strong>Segmentation:</strong> Isolating systems to contain potential breaches.</li>
            <li><strong>Compensating Controls:</strong> Implementing alternative security measures.</li>
        </ul>
    `,
    "4.4 Explain security alerting and monitoring concepts and tools.": `
        <h4>Study Guide: 4.4 Explain security alerting and monitoring concepts and tools.</h4>
        <p>These components enable organizations to detect and respond to threats in near-real-time.</p>
        <h5>Tools:</h5>
        <ul>
            <li><strong>SIEM (Security Information and Event Management):</strong> Provides real-time analysis of security alerts.</li>
            <li><strong>Antivirus:</strong> Detects, stops, and removes malware.</li>
            <li><strong>DLP (Data Loss Prevention):</strong> Monitors, detects, and blocks sensitive data from being exfiltrated.</li>
            <li><strong>NetFlow:</strong> A protocol for collecting IP traffic information.</li>
            <li><strong>Vulnerability Scanners:</strong> Tools like Nessus or Qualys that check for vulnerabilities.</li>
        </ul>
    `,
    "4.5 Given a scenario, modify enterprise capabilities to enhance security.": `
        <h4>Study Guide: 4.5 Given a scenario, modify enterprise capabilities to enhance security.</h4>
        <ul>
            <li><strong>Firewall:</strong> Regularly review and update rules and access lists.</li>
            <li><strong>Web Filter:</strong> Use URL scanning and content categorization to block malicious websites.</li>
            <li><strong>Email Security:</strong> Implement SPF, DKIM, and DMARC to prevent email spoofing.</li>
            <li><strong>File Integrity Monitoring:</strong> Monitor and alert on unexpected changes to critical system files.</li>
            <li><strong>Network Access Control (NAC):</strong> Ensure only authenticated and compliant devices can access the network.</li>
            <li><strong>EDR/XDR:</strong> Endpoint/Extended Detection and Response for monitoring and responding to threats.</li>
            <li><strong>User Behavior Analytics:</strong> Analyze user activity to detect anomalies.</li>
        </ul>
    `,
    "4.6 Given a scenario, implement and maintain identity and access management.": `
        <h4>Study Guide: 4.6 Given a scenario, implement and maintain identity and access management.</h4>
        <p>IAM ensures that the right people have the appropriate level of access at the right times.</p>
        <ul>
            <li><strong>Provisioning/De-provisioning:</strong> Creating and removing user accounts.</li>
            <li><strong>Federation & SSO:</strong> Allows a user to use one set of credentials to access resources across multiple platforms (Federation) or internal services (SSO).</li>
            <li><strong>Multifactor Authentication (MFA):</strong> Requires two or more pieces of evidence for authentication.</li>
            <li><strong>Password Concepts:</strong> Enforce complexity and length; promote password managers.</li>
            <li><strong>Privileged Access Management (PAM):</strong> Provides temporary, "just-in-time" permissions.</li>
        </ul>
    `,
    "4.7 Explain the importance of automation and orchestration related to secure operations.": `
        <h4>Study Guide: 4.7 Explain the importance of automation and orchestration related to secure operations.</h4>
        <p>Automation and orchestration remove manual, repetitive tasks, allowing for faster and more consistent security operations.</p>
        <h5>Use Cases:</h5>
        <ul>
            <li><strong>User/Resource Provisioning:</strong> Automating the creation of user accounts or deployment of VMs.</li>
            <li><strong>Ticket Creation and Escalation:</strong> Automatically generating tickets in response to security events.</li>
            <li><strong>Continuous Integration and Testing:</strong> Automatically testing code for vulnerabilities.</li>
        </ul>
        <h5>Benefits:</h5>
        <ul>
            <li>Efficiency/Time Saving</li>
            <li>Enforcing Baselines</li>
            <li>Faster Reaction Time</li>
        </ul>
    `,
    "4.8 Explain appropriate incident response activities.": `
        <h4>Study Guide: 4.8 Explain appropriate incident response activities.</h4>
        <p>Incident response is a structured approach for handling a cybersecurity incident.</p>
        <h5>Process:</h5>
        <ol>
            <li><strong>Preparation:</strong> Develop and maintain an incident response plan and team.</li>
            <li><strong>Detection & Analysis:</strong> Monitor systems and determine the scope of the incident.</li>
            <li><strong>Containment:</strong> Take immediate action to stop further damage.</li>
            <li><strong>Eradication:</strong> Remove the root cause of the incident.</li>
            <li><strong>Recovery:</strong> Restore and validate system functionality.</li>
            <li><strong>Lessons Learned:</strong> Conduct a post-incident review and update the plan.</li>
        </ol>
        <h5>Training and Forensics:</h5>
        <ul>
            <li><strong>Tabletop Exercise:</strong> A discussion-based session to walk through a hypothetical incident.</li>
            <li><strong>Legal Hold:</strong> Ensuring data relevant to a legal case is preserved.</li>
            <li><strong>Chain of Custody:</strong> Documenting every step of evidence handling.</li>
        </ul>
    `,
    "4.9 Given a scenario, use data sources to support an investigation.": `
        <h4>Study Guide: 4.9 Given a scenario, use data sources to support an investigation.</h4>
        <h5>Log Data:</h5>
        <ul>
            <li><strong>Firewall logs:</strong> Show connections to and from an IP address.</li>
            <li><strong>Application logs:</strong> Can reveal application errors or unauthorized access.</li>
            <li><strong>Endpoint logs:</strong> Show malware detections on a host.</li>
            <li><strong>IPS/IDS logs:</strong> Provide alerts related to known attack patterns.</li>
        </ul>
        <h5>Other Data Sources:</h5>
        <ul>
            <li><strong>Vulnerability scans:</strong> Show if a system has known vulnerabilities.</li>
            <li><strong>Packet captures:</strong> Allow for examination of the raw data packets.</li>
        </ul>
    `,
    "5.1 Summarize elements of effective security governance.": `
        <h4>Study Guide: 5.1 Summarize elements of effective security governance.</h4>
        <p>Security governance is the framework of policies and procedures that aligns security with business objectives.</p>
        <h5>Documents:</h5>
        <ul>
            <li><strong>Policies:</strong> High-level rules (e.g., Acceptable Use Policy).</li>
            <li><strong>Standards:</strong> Define specific, mandatory requirements (e.g., encryption standards).</li>
            <li><strong>Procedures:</strong> Step-by-step instructions for specific tasks.</li>
            <li><strong>Guidelines:</strong> General, flexible recommendations.</li>
        </ul>
        <h5>Roles and Responsibilities:</h5>
        <ul>
            <li><strong>Owners:</strong> Responsible for data and its protection.</li>
            <li><strong>Controllers:</strong> Determine how and why personal data is processed.</li>
            <li><strong>Processors:</strong> Process data on behalf of the controller.</li>
            <li><strong>Custodians/Stewards:</strong> Responsible for the safe custody and storage of data.</li>
        </ul>
    `,
    "5.2 Explain elements of the risk management process.": `
        <h4>Study Guide: 5.2 Explain elements of the risk management process.</h4>
        <p>Risk management is the systematic approach to identifying, assessing, and addressing risks.</p>
        <h5>Risk Analysis:</h5>
        <ul>
            <li><strong>Qualitative:</strong> Uses subjective judgment (High, Medium, Low).</li>
            <li><strong>Quantitative:</strong> Uses numerical values (SLE, ARO, ALE).</li>
        </ul>
        <h5>Risk Management Strategies:</h5>
        <ul>
            <li><strong>Transfer:</strong> Shift the risk (e.g., insurance).</li>
            <li><strong>Accept:</strong> Acknowledge and bear the risk.</li>
            <li><strong>Avoid:</strong> Stop the activity causing the risk.</li>
            <li><strong>Mitigate:</strong> Implement controls to reduce the risk.</li>
        </ul>
        <h5>Business Impact Analysis (BIA):</h5>
        <ul>
            <li><strong>RTO (Recovery Time Objective):</strong> The time within which a business process must be restored.</li>
            <li><strong>RPO (Recovery Point Objective):</strong> The maximum acceptable amount of data loss.</li>
        </ul>
    `,
    "5.3 Explain the processes associated with third-party risk assessment and management.": `
        <h4>Study Guide: 5.3 Explain the processes associated with third-party risk assessment and management.</h4>
        <p>This involves managing the risks associated with vendors and other external organizations.</p>
        <ul>
            <li><strong>Vendor Assessment:</strong> Includes penetration testing, right-to-audit clauses, and supply chain analysis.</li>
            <li><strong>Vendor Selection:</strong> Requires due diligence (investigating a vendor's reputation and history).</li>
            <li><strong>Agreement Types:</strong> SLA (defines service level), NDA (ensures confidentiality), SOW (specifies work).</li>
            <li><strong>Vendor Monitoring:</strong> Continuously evaluating a vendor's performance and security.</li>
        </ul>
    `,
    "5.4 Summarize elements of effective security compliance.": `
        <h4>Study Guide: 5.4 Summarize elements of effective security compliance.</h4>
        <h5>Consequences of Non-compliance:</h5>
        <p>Can include fines, sanctions, reputational damage, and loss of license.</p>
        <h5>Privacy:</h5>
        <ul>
            <li><strong>Legal Implications:</strong> Adhering to privacy laws like GDPR.</li>
            <li><strong>Data Subject:</strong> An individual whose personal data is being collected.</li>
            <li><strong>Controller vs. Processor:</strong> The controller determines the 'why' of data processing; the processor acts on behalf of the controller.</li>
            <li><strong>Right to be Forgotten:</strong> An individual's right to have their personal data erased (key in GDPR).</li>
        </ul>
    `,
    "5.5 Explain types and purposes of audits and assessments.": `
        <h4>Study Guide: 5.5 Explain types and purposes of audits and assessments.</h4>
        <p>Audits and assessments verify that systems and processes adhere to required standards.</p>
        <h5>Types:</h5>
        <ul>
            <li><strong>Internal:</strong> Self-assessments conducted by the organization.</li>
            <li><strong>External:</strong> Audits conducted by independent third parties or regulatory bodies.</li>
        </ul>
        <h5>Penetration Testing:</h5>
        <ul>
            <li><strong>Environments:</strong> Known (white-box), Partially Known (gray-box), Unknown (black-box).</li>
            <li><strong>Reconnaissance:</strong> Passive (gathering public info) vs. Active (directly interacting with the target).</li>
        </ul>
    `,
    "5.6 Given a scenario, implement security awareness practices.": `
        <h4>Study Guide: 5.6 Given a scenario, implement security awareness practices.</h4>
        <ul>
            <li><strong>Phishing Campaigns:</strong> Launch controlled phishing campaigns to test and train employees.</li>
            <li><strong>Anomalous Behavior Recognition:</strong> Train employees to recognize high-risk behaviors and unexpected system activity.</li>
            <li><strong>User Guidance and Training:</strong> Provide regular training on security policies, password management, and social engineering.</li>
            <li><strong>Reporting:</strong> Establish a clear protocol for employees to report suspicious messages.</li>
        </ul>
    `
};
