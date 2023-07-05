module full_adder_testbench;

reg a,b,cin;
wire s,c;

full_adder fa (s,c,a,b,cin);
initial begin
    $dumpfile("full_adder.vcd");
    $dumpvars(0,full_adder_testbench);
    $monitor($time," a=%b b=%b cin=%b s=%b c=%b",$time,a,b,cin,s,c);
    a=0; b=0; cin=0;
    #10 a=0; b=0; cin=1;
    #10 a=0; b=1; cin=0;
    #10 a=0; b=1; cin=1;
    #10 a=1; b=0; cin=0;
    #10 a=1; b=0; cin=1;
    #10 a=1; b=1; cin=0;
    #10 a=1; b=1; cin=1;
    #10 $finish;
end

endmodule