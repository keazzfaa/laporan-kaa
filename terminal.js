document.addEventListener('DOMContentLoaded', () => {
    const terminals = [
        {
            id: 'terminal1',
            commands: [
                { 
                    cmd: 'sudo wireshark -i eth0', 
                    output: [
                        'Initializing Wireshark...', 
                        'Starting capture on eth0...', 
                        'Packets captured: 156', 
                        'Protocol breakdown:', 
                        '- TCP: 65%', 
                        '- UDP: 25%', 
                        '- ICMP: 10%'
                    ]
                },
                { 
                    cmd: 'tshark -i eth0 -c 10', 
                    output: [
                        'Capturing on eth0...', 
                        '1 192.168.1.100 -> 8.8.8.8 DNS Standard query',
                        '2 8.8.8.8 -> 192.168.1.100 DNS Standard query response',
                        '3 192.168.1.100 -> 216.58.210.46 TCP 52986 > https',
                        '4 216.58.210.46 -> 192.168.1.100 TCP https > 52986'
                    ]
                }
            ]
        },
        {
            id: 'terminal2',
            commands: [
                { 
                    cmd: 'nmap -sV --script vuln 192.168.1.0/24', 
                    output: [
                        'Starting Nmap 7.92...',
                        'Scanning 256 hosts...',
                        'Found vulnerable services:',
                        '- CVE-2021-44228 on 192.168.1.10',
                        '- MS17-010 on 192.168.1.15',
                        'Scan complete - 5 hosts up'
                    ]
                },
                { 
                    cmd: 'nikto -h 192.168.1.10', 
                    output: [
                        '- Nikto v2.1.6',
                        '+ Target IP: 192.168.1.10',
                        '+ Target Hostname: target',
                        '+ Multiple index files found',
                        '+ Server: Apache/2.4.41',
                        '+ Retrieved x-powered-by header: PHP/7.4.3'
                    ]
                }
            ]
        },
        {
            id: 'terminal3',
            commands: [
                { 
                    cmd: 'msfconsole', 
                    output: [
                        'Metasploit Framework 6.1.27',
                        'msf6 > use exploit/windows/smb/ms17_010_eternalblue',
                        'msf6 exploit(windows/smb/ms17_010_eternalblue) > set RHOSTS 192.168.1.15',
                        'RHOSTS => 192.168.1.15',
                        'msf6 exploit(windows/smb/ms17_010_eternalblue) > exploit'
                    ]
                },
                { 
                    cmd: 'searchsploit apache 2.4', 
                    output: [
                        '-------------------------------- ------------------------',
                        ' Exploit Title                  |  Path',
                        '-------------------------------- ------------------------',
                        'Apache 2.4.49 - Path Traversal  | multiple/webapps/50383.sh',
                        'Apache 2.4.50 - Remote Code Ex  | multiple/webapps/50512.py'
                    ]
                }
            ]
        }
    ];

    terminals.forEach(terminal => {
        const terminalElement = document.getElementById(terminal.id);
        const commandElement = terminalElement.querySelector('.command');
        const outputElement = terminalElement.querySelector('.terminal-output');
        let currentCommand = 0;
        let currentChar = 0;

        function typeCommand() {
            if (currentChar < terminal.commands[currentCommand].cmd.length) {
                commandElement.textContent = terminal.commands[currentCommand].cmd.slice(0, currentChar + 1);
                currentChar++;
                setTimeout(typeCommand, Math.random() * 50 + 50);
            } else {
                setTimeout(() => showOutput(terminal, outputElement, currentCommand), 500);
            }
        }

        function showOutput(terminal, outputElement, cmdIndex) {
            outputElement.innerHTML = '';
            terminal.commands[cmdIndex].output.forEach((line, index) => {
                setTimeout(() => {
                    const outputLine = document.createElement('div');
                    outputLine.classList.add('terminal-line');
                    outputLine.textContent = line;
                    outputElement.appendChild(outputLine);
                }, index * 300);
            });

            setTimeout(() => {
                currentCommand = (currentCommand + 1) % terminal.commands.length;
                currentChar = 0;
                commandElement.textContent = '';
                outputElement.innerHTML = '';
                typeCommand();
            }, terminal.commands[cmdIndex].output.length * 1000 + 2000);
        }

        setTimeout(() => typeCommand(), Math.random() * 1000);
    });
});
